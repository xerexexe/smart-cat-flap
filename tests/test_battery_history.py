"""Exercise the actual SQLite counter model, including gaps, resets and DST."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from datetime import datetime
from zoneinfo import ZoneInfo

MODULE = Path(__file__).parents[1] / "home_assistant/custom_components/cat_flap_battery_history/history.py"
spec = importlib.util.spec_from_file_location("battery_history", MODULE)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class HistoryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.history = module.BatteryHistory(Path(self.temp.name) / "battery.sqlite", learning_days=0)
        self.start = datetime(2026, 10, 1, tzinfo=ZoneInfo("Europe/Berlin")).timestamp()

    def tearDown(self):
        self.temp.cleanup()

    def add(self, elapsed, discharge, seconds, usb=0, boot=1, uptime=None):
        return self.history.record(self.start + elapsed, {"v": 1, "b": boot, "d": discharge, "c": 0,
            "s": seconds, "u": usb, "g": 0, "t": elapsed if uptime is None else uptime},
            {"level": 90, "capacity": 2000, "source": "battery"})

    def test_weighted_intervals_not_wifi_snapshot_average(self):
        self.add(0, 0, 0)
        self.add(300, 1, 300)
        self.add(3600, 3, 3600)
        result = self.history.summary(self.start + 3600)
        self.assertAlmostEqual(result["daily_consumption_mah"], 72)
        self.assertIsNone(result["runtime_hours"])  # Not enough actual battery observation.
        self.assertFalse(self.add(3601, 3, 3600, uptime=3600))

    def test_missing_night_is_not_zero_current(self):
        self.add(0, 0, 0)
        self.add(86400, 80, 57600, boot=2, uptime=100)
        result = self.history.summary(self.start + 86400)
        self.assertEqual(result["missing_hours"], 8)
        self.assertAlmostEqual(result["daily_consumption_mah"], 120)

    def test_usb_time_is_not_used_as_discharge_time(self):
        self.add(0, 0, 0)
        self.add(86400, 80, 28800, usb=57600)
        self.assertAlmostEqual(self.history.summary(self.start + 86400)["daily_consumption_mah"], 240)

    def test_counter_reset_becomes_a_gap(self):
        self.add(0, 10, 100)
        self.add(300, 1, 20, boot=2, uptime=20)
        result = self.history.summary(self.start + 300)
        self.assertEqual(result["missing_hours"], round(300 / 3600, 2))
        self.assertIsNone(result["daily_consumption_mah"])

    def test_weeks_are_groupings_not_extra_consumption(self):
        self.add(0, 0, 0)
        for day in range(1, 9):
            self.add(day * 86400, day * 100, day * 86400)
        result = self.history.summary(self.start + 8 * 86400)
        self.assertAlmostEqual(result["daily_consumption_mah"], 100)
        self.assertAlmostEqual(result["runtime_hours"], 432)
        self.assertAlmostEqual(sum(x["discharge_mah"] for x in result["weekly"]), 800)

    def test_rolling_window_and_persistence(self):
        self.add(0, 0, 0)
        self.add(40 * 86400, 4000, 40 * 86400)
        reopened = module.BatteryHistory(self.history.path, learning_days=0)
        result = reopened.summary(self.start + 40 * 86400)
        self.assertAlmostEqual(result["observed_battery_hours"], 30 * 24)
        self.assertAlmostEqual(sum(x["discharge_mah"] for x in result["daily"]), 3000)
        self.assertAlmostEqual(result["daily_consumption_mah"], 100)

    def test_dst_day_uses_actual_elapsed_seconds(self):
        self.start = datetime(2026, 10, 25, tzinfo=ZoneInfo("Europe/Berlin")).timestamp()
        self.add(0, 0, 0)
        self.add(25 * 3600, 100, 25 * 3600)
        result = self.history.summary(self.start + 25 * 3600)
        self.assertEqual(len(result["daily"]), 1)
        self.assertAlmostEqual(result["daily"][0]["battery_seconds"], 25 * 3600)

    def test_same_boot_uptime_rollback_is_a_gap_and_recovers(self):
        self.add(0, 0, 0, uptime=1000)
        self.add(300, 1, 300, uptime=100)
        self.add(600, 2, 600, uptime=400)
        result = self.history.summary(self.start + 600)
        self.assertEqual(result["missing_hours"], round(300 / 3600, 2))
        self.assertEqual(result["observed_battery_hours"], round(300 / 3600, 2))

    def test_learning_requires_month_then_stale_readings_hide_runtime(self):
        self.history.learning_days = 30
        self.add(0, 0, 0)
        self.add(29 * 86400, 2900, 29 * 86400)
        self.assertIsNone(self.history.summary(self.start + 29 * 86400)["runtime_hours"])
        self.add(30 * 86400, 3000, 30 * 86400)
        self.assertAlmostEqual(self.history.summary(self.start + 30 * 86400)["runtime_hours"], 432)
        self.assertIsNone(self.history.summary(self.start + 30 * 86400 + 901)["runtime_hours"])


if __name__ == "__main__":
    unittest.main()
