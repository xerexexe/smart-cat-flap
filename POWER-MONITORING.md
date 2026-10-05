# Battery and power monitoring

The automatic dashboard now reserves rows for battery voltage, power source,
charging status, estimated time remaining and the low-battery warning. Missing
hardware measurements display **Unknown**. Installing this card does not add
measurement hardware or enable those readings in firmware.

The present XIAO ESP32-C6 build runs from a battery, but its battery pads alone
do not provide the firmware with a voltage, charging or USB-presence reading.
Do not infer the power source from the Wi-Fi connection or call a rising battery
voltage a confirmed charging signal.

## Signals to connect later

| Entity suffix | Values | Requirement |
|---|---|---|
| `sensor.*_battery_voltage` | Voltage in V, or unknown/unavailable | ADC voltage divider and calibration; never connect BAT directly to an ADC |
| `sensor.*_power_source` | `usb`, `battery`, or `unknown` | Verified USB-presence measurement |
| `sensor.*_charging_status` | `charging`, `not_charging`, `full`, or `unknown` | Verified charger status measurement; USB presence alone cannot distinguish charging from full |
| `sensor.*_estimated_runtime` | Estimate in hours, or unknown/unavailable | Measured consumption and a calibrated usable-capacity estimate; clear the estimate while charging or when inputs are invalid |
| `binary_sensor.*_battery_low` | on/off or unknown/unavailable | Validated real battery voltage; existing simulated warning remains separate |

Replace `*` with the configured prefix. Legacy German firmware uses
`sensor.katzenklappe_akkuspannung` and `binary_sensor.katzenklappe_akku_niedrig`.
The three new suffixes are the same for both firmware variants.

GPIO0/D0 is already used by the inside contact. A future ADC circuit must use
another suitable ADC pin rather than the A0 wiring in the generic Seeed example.
Hardware, resistor values and charger-status access still require verification
before adding a wiring diagram or flashing measurement code.

See [Seeed battery documentation](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/#battery-usage).

## Opening notifications

Opening notifications include the event's local time and use a different tag
for each event, preventing a newer opening from replacing the preceding one.
Android priority is `high`. The one-day TTL allows queued delivery when the
phone is temporarily offline; delivery time is not guaranteed, so use the
event time in the message. Actual phone settings and connectivity still matter.

The firmware re-arms after both contacts have remained inactive for 500 ms,
instead of five seconds. The 50 ms debounce and 100 ms ambiguity window remain.
Movements during the quiet period are still part of the current movement and
are not reported separately. Test mounting for unwanted extra counts caused
by flap oscillation before relying on the shortened period.

References: [notification replacement](https://companion.home-assistant.io/docs/notifications/notifications-basic/#replacing),
[Android priority](https://companion.home-assistant.io/docs/notifications/critical-notifications/#android).
