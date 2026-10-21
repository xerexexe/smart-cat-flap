# Local battery history

[Deutsch](BATTERY-HISTORY.de.md)

The optional Home Assistant integration stores battery reports in a separate local SQLite database at `<HA config>/cat_flap_battery_history.sqlite`. It does not change Home Assistant Recorder retention. Include this file in backups; it contains timestamps and device telemetry.

## Installation

1. Update the INA3221 firmware package and the battery-saving package together. The new `Battery history report` diagnostic entity sends persistent cumulative discharge/charge counters, measured battery/USB seconds, boot ID, uptime and gap count.
2. Copy `home_assistant/custom_components/cat_flap_battery_history/` into `<HA config>/custom_components/cat_flap_battery_history/`.
3. Add this platform to the existing `sensor:` list in `configuration.yaml` (do not create a second `sensor:` key):

```yaml
sensor:
  - platform: cat_flap_battery_history
    entity_prefix: smart_cat_flap
    telemetry_entity: sensor.smart_cat_flap_battery_history_report
```

For the original German installation, use `katzenklappe` for both prefixes. Restart Home Assistant after installing the new integration. Update the dashboard JavaScript and its resource version as described in [LOCALIZATION.md](LOCALIZATION.md).

## Learning and runtime

- Learning continues using the most recent **30 days**. The first forecast requires 30 elapsed days and at least seven days of actual measured battery operation within the window. Before then the dashboard shows learning progress instead of the old short-window forecast.
- Consumption is `sum(discharge mAh) / sum(measured battery hours) × 24`. Long intervals receive their actual time weight. Weekly and daily groups describe the same measurements and are never added together.
- Runtime is remaining estimated capacity divided by that daily consumption. USB-connected time is excluded from the consumption denominator; the forecast can still describe how long the remaining charge would last on battery.
- Reboots, counter rollback, invalid values and measurement gaps are not zero consumption. Reports older than 15 minutes hide the forecast. Stored calibration and the device's charge estimate remain separate from the learned consumption model.
- **Night deep sleep cannot measure consumption.** The INA3221 board still consumes power. More than 5% unmeasured time (and at least five minutes) marks a mature forecast as partial. Such a forecast describes measured operation and may overestimate actual runtime. Small sleep currents and Wi-Fi peaks remain limited by the hardware sampling accuracy.

The model-status entity exposes daily and ISO-week groups for the rolling window, measured hours and missing hours. Counter deltas spanning midnight are allocated proportionally, including daylight-saving changes; this does not reconstruct the exact overnight load profile. All raw samples and interval records remain in SQLite, including older history, so earlier daily/weekly totals can be reconstructed. The database grows over time; there is no automatic deletion.

The integration also stores voltage, current, charge estimate, capacity, source, estimate quality and relevant reporting settings alongside reports. These auxiliary fields are diagnostic; they are not treated as continuously measured consumption during a radio pause. Firmware counters bridge radio pauses; flash checkpoint losses after a power failure are treated as gaps.

Entities use the selected prefix with suffixes `history_runtime`, `history_model_status`, `history_daily_consumption`, `history_observed_hours` and `history_missing_hours`. Units are hours and mAh; dashboard runtime displays days and hours above one day. The model does not command charging or recalibrate the battery automatically.
