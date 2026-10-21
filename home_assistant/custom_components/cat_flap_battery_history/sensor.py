"""Record atomic device counters locally and expose the rolling learning model."""
import asyncio
from datetime import timedelta
import json
import logging
from pathlib import Path

import voluptuous as vol
from homeassistant.components.sensor import PLATFORM_SCHEMA, SensorEntity
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_state_change_event, async_track_time_interval
from homeassistant.util import dt as dt_util

from .history import BatteryHistory

LOGGER = logging.getLogger(__name__)
PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional("entity_prefix", default="katzenklappe"): cv.slug,
    vol.Optional("telemetry_entity", default="sensor.katzenklappe_battery_history_report"): cv.entity_id,
})


async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    prefix = config["entity_prefix"]
    path = hass.config.path("cat_flap_battery_history.sqlite")
    history = await hass.async_add_executor_job(BatteryHistory, path, str(hass.config.time_zone), 30)
    coordinator = HistoryRecorder(hass, prefix, config["telemetry_entity"], history)
    entities = [HistorySensor(coordinator, key, name, unit) for key, name, unit in (
        ("runtime", "Learned battery runtime", "h"),
        ("model_status", "Battery learning status", None),
        ("daily_consumption", "Measured daily battery consumption", "mAh"),
        ("observed_hours", "Observed battery hours", "h"),
        ("missing_hours", "Unmeasured battery history hours", "h"),
    )]
    coordinator.entities = entities
    async_add_entities(entities)
    hass.data.setdefault("cat_flap_battery_history", {})[prefix] = coordinator
    await coordinator.update()
    coordinator.start()


class HistoryRecorder:
    def __init__(self, hass, prefix, telemetry_entity, history):
        self.hass, self.prefix, self.telemetry_entity, self.history = hass, prefix, telemetry_entity, history
        self.entities, self.summary = [], {}
        self.lock, self.pending = asyncio.Lock(), None
        self.last_record = 0

    def start(self):
        @callback
        def changed(event):
            if self.pending is None or self.pending.done():
                self.pending = self.hass.async_create_task(self.delayed_update())
        self.unsubscribe = async_track_state_change_event(self.hass, [self.telemetry_entity], changed)
        self.unsubscribe_timer = async_track_time_interval(self.hass, self.update, timedelta(minutes=5))

    async def delayed_update(self):
        await asyncio.sleep(2)
        await self.update()

    def state(self, suffix, domain="sensor"):
        state = self.hass.states.get(f"{domain}.{self.prefix}_{suffix}")
        return state.state if state else None

    async def update(self, now=None):
        async with self.lock:
            timestamp = dt_util.utcnow().timestamp()
            telemetry = self.hass.states.get(self.telemetry_entity)
            try:
                if telemetry and telemetry.state not in ("unknown", "unavailable") and timestamp - self.last_record >= 30:
                    current = self.history.number(self.state("battery_current"))
                    state = {
                        "voltage": self.state("akkuspannung") or self.state("battery_voltage"),
                        "current_ma": current * 1000 if current is not None else None,
                        "level": self.state("estimated_battery_level"),
                        "capacity": self.state("usable_battery_capacity", "number"),
                        "source": self.state("power_source"), "quality": self.state("battery_estimate_quality"),
                        "opening_count": self.state("oeffnungen_seit_neustart") or self.state("openings_since_restart"),
                        "pending_openings": self.state("pending_openings"),
                        "reporting_interval": self.state("reporting_interval", "number"),
                        "saving": self.state("experimental_battery_saving", "switch"),
                        "night_rest": self.state("night_rest", "switch"),
                    }
                    await self.hass.async_add_executor_job(self.history.record, timestamp, telemetry.state, state)
                    self.last_record = timestamp
                self.summary = await self.hass.async_add_executor_job(self.history.summary, timestamp)
            except (ValueError, json.JSONDecodeError):
                LOGGER.warning("Ignoring invalid cat flap battery telemetry")
            except Exception:
                LOGGER.exception("Could not update local cat flap battery history")
                self.summary = {**self.summary, "quality": "storage_error", "runtime_hours": None}
            for entity in self.entities:
                if entity.hass is not None:
                    entity.async_write_ha_state()


class HistorySensor(SensorEntity):
    _attr_should_poll = False
    _attr_icon = "mdi:battery-clock"

    def __init__(self, coordinator, key, name, unit):
        self.coordinator, self.key = coordinator, key
        self._attr_name = f"{coordinator.prefix} {name}"
        self._attr_unique_id = f"cat_flap_battery_history_{coordinator.prefix}_{key}"
        self.entity_id = f"sensor.{coordinator.prefix}_history_{key}"
        self._attr_native_unit_of_measurement = unit
        self._attr_suggested_display_precision = None if unit is None else 1 if unit == "h" else 2

    @property
    def native_value(self):
        result = self.coordinator.summary
        field = {"runtime": "runtime_hours", "model_status": "quality", "daily_consumption": "daily_consumption_mah",
                 "observed_hours": "observed_battery_hours", "missing_hours": "missing_hours"}[self.key]
        return result.get(field)

    @property
    def extra_state_attributes(self):
        result = self.coordinator.summary
        if self.key == "model_status":
            return {k: result.get(k) for k in ("learning_days", "required_days", "window_days", "observed_battery_hours",
                                              "missing_hours", "latest_report", "daily", "weekly")}
        return {"model_quality": result.get("quality"), "learning_days": result.get("learning_days"),
                "basis": "measured battery intervals; deep-sleep gaps are not zero consumption"}
