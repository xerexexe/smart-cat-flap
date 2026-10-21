"""SQLite storage and time-weighted learning; independent of Home Assistant.

Only counter differences represent consumption. Never integrate a Wi-Fi-window
current reading over an offline interval or interpret missing samples as zero.
Daily/weekly groups are views of the same segments, never added twice.
"""
from contextlib import contextmanager
import json
import math
import sqlite3
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

DAY = 86400.0


class BatteryHistory:
    def __init__(self, path, timezone_name="Europe/Berlin", learning_days=30):
        self.path = str(path)
        self.zone = ZoneInfo(timezone_name)
        self.learning_days = learning_days
        with self.connect() as db:
            db.executescript("""
                CREATE TABLE IF NOT EXISTS samples (
                    ts REAL PRIMARY KEY, device_boot INTEGER NOT NULL,
                    discharge_mah REAL NOT NULL, charge_mah REAL NOT NULL,
                    battery_seconds REAL NOT NULL, usb_seconds REAL NOT NULL,
                    gaps INTEGER NOT NULL, uptime REAL NOT NULL,
                    voltage REAL, current_ma REAL, level REAL, capacity REAL,
                    source TEXT, quality TEXT, extras TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS segments (
                    start REAL NOT NULL, end REAL PRIMARY KEY,
                    discharge_mah REAL NOT NULL, battery_seconds REAL NOT NULL,
                    usb_seconds REAL NOT NULL, missing_seconds REAL NOT NULL,
                    counter_reset INTEGER NOT NULL DEFAULT 0
                );
                CREATE TABLE IF NOT EXISTS metadata (key TEXT PRIMARY KEY, value TEXT);
                PRAGMA user_version=1;
            """)

    @contextmanager
    def connect(self):
        db = sqlite3.connect(self.path, timeout=10)
        db.row_factory = sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    @staticmethod
    def number(value):
        try:
            n = float(value)
            return n if math.isfinite(n) else None
        except (ValueError, TypeError):
            return None

    def record(self, ts, telemetry, state):
        """Record an atomic ESP report. Duplicate deliveries don't create energy."""
        if isinstance(telemetry, str):
            telemetry = json.loads(telemetry)
        if telemetry.get("v") != 1:
            raise ValueError("Unsupported battery telemetry version")
        values = [self.number(telemetry.get(k)) for k in ("b", "d", "c", "s", "u", "g", "t")]
        if any(v is None or v < 0 for v in values):
            raise ValueError("Invalid battery counters")
        boot, discharge, charge, measured, usb, gaps, uptime = values
        with self.connect() as db:
            last = db.execute("SELECT * FROM samples ORDER BY ts DESC LIMIT 1").fetchone()
            if last and ts <= last["ts"]:
                return False
            if last and boot == last["device_boot"] and uptime == last["uptime"]:
                return False
            db.execute("INSERT OR IGNORE INTO metadata VALUES ('started', ?)", (str(ts),))
            db.execute("INSERT INTO samples VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (
                ts, int(boot), discharge, charge, measured, usb, int(gaps), uptime,
                self.number(state.get("voltage")), self.number(state.get("current_ma")),
                self.number(state.get("level")), self.number(state.get("capacity")),
                state.get("source"), state.get("quality"), json.dumps(state, ensure_ascii=False),
            ))
            if last:
                wall = ts - last["ts"]
                ds = measured - last["battery_seconds"]
                du = usb - last["usb_seconds"]
                dm = discharge - last["discharge_mah"]
                dc = charge - last["charge_mah"]
                # Counters may roll back to their last flash checkpoint after power loss.
                reset = min(ds, du, dm, dc) < -0.001 or ds + du > wall + 30
                reset = reset or (boot == last["device_boot"] and uptime < last["uptime"])
                # Reject physically impossible data instead of distorting a month's model.
                reset = reset or (ds >= 0 and dm > max(2.0, ds * 1000 / 3600 + 1))
                if reset:
                    ds = du = dm = 0.0
                else:
                    ds, du, dm = max(0, ds), max(0, du), max(0, dm)
                missing = max(0.0, wall - ds - du)
                db.execute("INSERT INTO segments VALUES (?,?,?,?,?,?,?)", (
                    last["ts"], ts, dm, ds, du, missing, int(reset)))
        return True

    def summary(self, now):
        with self.connect() as db:
            start_row = db.execute("SELECT value FROM metadata WHERE key='started'").fetchone()
            latest = db.execute("SELECT * FROM samples ORDER BY ts DESC LIMIT 1").fetchone()
            rows = db.execute("SELECT * FROM segments WHERE end>? ORDER BY end", (now - 30 * DAY,)).fetchall()
        started = float(start_row[0]) if start_row else now
        days = max(0, (now - started) / DAY)
        totals = dict(discharge_mah=0.0, battery_seconds=0.0, usb_seconds=0.0, missing_seconds=0.0)
        daily = {}
        for row in rows:
            left, right = max(row["start"], now - 30 * DAY), min(row["end"], now)
            span = row["end"] - row["start"]
            if right <= left or span <= 0:
                continue
            for key in totals:
                totals[key] += row[key] * (right - left) / span
            # Allocate counter deltas proportionally when a reporting gap crosses midnight.
            # This is attribution, not a claim to know the unobserved current profile.
            while left < right:
                local = datetime.fromtimestamp(left, self.zone)
                next_day = datetime.fromordinal(local.date().toordinal() + 1).replace(tzinfo=self.zone)
                end = min(right, next_day.timestamp())
                bucket = daily.setdefault(local.date().isoformat(), {
                    "date": local.date().isoformat(), "discharge_mah": 0.0,
                    "battery_seconds": 0.0, "usb_seconds": 0.0, "missing_seconds": 0.0})
                for key in totals:
                    bucket[key] += row[key] * (end - left) / span
                left = end
        weekly = {}
        for bucket in daily.values():
            year, week, _ = datetime.fromisoformat(bucket["date"]).isocalendar()
            group = weekly.setdefault(f"{year}-W{week:02}", {"week": f"{year}-W{week:02}", **dict.fromkeys(totals, 0.0)})
            for key in totals:
                group[key] += bucket[key]
        for bucket in [*daily.values(), *weekly.values()]:
            seconds = bucket["battery_seconds"]
            bucket["normalized_mah_per_day"] = bucket["discharge_mah"] * DAY / seconds if seconds >= 3600 else None
        measured = totals["battery_seconds"]
        daily_rate = totals["discharge_mah"] * DAY / measured if measured >= 3600 else None
        # Calendar history and enough actual battery time are both required.
        mature = days >= self.learning_days and measured >= 7 * DAY
        stale = latest is None or now - latest["ts"] > 900
        significant_gaps = totals["missing_seconds"] > max(300, 0.05 * (sum(totals[k] for k in ("battery_seconds", "usb_seconds", "missing_seconds"))))
        quality = "no_data" if latest is None else "learning" if not mature else "stale" if stale else "partial" if significant_gaps else "ready"
        runtime = None
        if (mature and not stale and daily_rate and latest["level"] is not None
                and 0 <= latest["level"] <= 100 and latest["capacity"] is not None and latest["capacity"] > 0):
            runtime = latest["capacity"] * latest["level"] / 100 / daily_rate * 24
        return {
            "quality": quality, "learning_days": round(min(days, self.learning_days), 2),
            "required_days": self.learning_days, "window_days": 30,
            "observed_battery_hours": round(measured / 3600, 2),
            "missing_hours": round(totals["missing_seconds"] / 3600, 2),
            "daily_consumption_mah": daily_rate, "runtime_hours": runtime,
            "latest_report": latest["ts"] if latest else None,
            "daily": list(daily.values()), "weekly": list(weekly.values()),
        }
