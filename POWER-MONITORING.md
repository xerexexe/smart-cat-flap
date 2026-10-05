# Battery and power monitoring

The automatic dashboard now reserves rows for battery voltage, power source,
charging status, estimated time remaining and the low-battery warning. Missing
hardware measurements display **Unknown**. Installing this card does not add
measurement hardware or enable those readings in firmware.

The present XIAO ESP32-C6 build runs from a battery, but its battery pads alone
do not provide the firmware with a voltage, charging or USB-presence reading.
Do not infer the power source from the Wi-Fi connection or call a rising battery
voltage a confirmed charging signal.

## Optional INA219 package

[Deutsche Verdrahtungsanleitung](POWER-MONITORING.de.md)

`power-monitoring.yaml` adds real battery voltage/current, USB detection, net
charging status and a rough runtime estimate. Physical installation and tests
are still pending. Enable the package only after installing its hardware.

Software check on 2026-10-05: English example plus package successfully compiled
with ESPHome 2026.9.1 for ESP32-C6; the legacy German ID overrides passed ESPHome
configuration validation. These checks do not validate electrical measurements.

### Additional parts

| Quantity | Part | Purpose |
|---|---|---|
| 1 | INA219 module, 0.1 Ω shunt marked R100, VIN+/VIN− and I²C pins | Battery voltage and bidirectional battery current |
| 1 | 68 kΩ resistor, 1%, ≥0.125 W | Upper USB-detection divider resistor |
| 1 | 100 kΩ resistor, 1%, ≥0.125 W | Lower USB-detection divider resistor |

No extra charger or breadboard is required. Allow space for the module and its
mounting. The existing XIAO USB-C connection continues to charge the battery.

### Wiring without reheating BAT pads

Disconnect USB. Interrupt only the accessible red battery lead and insulate its
ends separately. The battery remains electrically live, but the interrupted
positive lead disconnects it from the ESP during assembly. Complete and insulate
the circuit before reconnecting it. Leave the black lead and existing BAT solder
joints in place.

```text
Battery red (+) ── VIN+ [INA219 / R100] VIN− ── existing lead to XIAO BAT+
Battery black (−) ─────────────────────────── existing lead to XIAO BAT−
```

| INA219 pin | XIAO connection |
|---|---|
| VCC | 3V3 |
| GND | GND |
| SDA | D4 / GPIO22 |
| SCL | D5 / GPIO23 |

VIN+/VIN− carry battery current; VCC powers the sensor electronics. With this
orientation, positive current discharges the battery, negative current charges it.
Connect these wires to the outer XIAO pins; no new BAT-pad soldering is needed.

```text
XIAO 5V ── 68 kΩ ──┬── D3 / GPIO21
                    └── 100 kΩ ── GND
```

Before connecting D3, measure the junction against GND: about 3.0 V with USB
at 5 V, about 0 V without USB. Never connect 5 V directly to D3. D0/D1 retain
their reed contacts; D6/D7 remain available for a future UART reader.

### Enable after assembly

Copy the package beside the device YAML and add to the English example:

```yaml
packages:
  power_monitor: !include power-monitoring.yaml
```

For the project's existing German firmware:

```yaml
packages:
  power_monitor: !include
    file: power-monitoring.yaml
    vars:
      pm_battery_script: akku_verarbeiten
      pm_voltage_id: akkuspannung_echt
      pm_warning_id: akkuwarnung_echt
```

Extend any existing `packages:` section rather than duplicating it. Preserve the
device's identity and credentials. Validate and compile before installing. The
INA219 must have address 0x40 and the configured 0.1 Ω shunt.

### Readings and limits

Battery-side voltage combines bus and signed shunt voltage. It feeds the existing
low warning at ≤3.5 V, with recovery at ≥3.65 V. USB presence identifies the
source. Net current into the battery above 5 mA with USB present means `charging`;
current out above 5 mA means `discharging`; near-zero current means `not_charging`.
That does not establish a full battery or diagnose the charger's internal state.

For runtime, fully charge the battery, observe the red charge LED turn off, then
press **Confirm full battery** in device settings. Confirmation requires fresh
measurements, USB present, ≥4.10 V and current magnitude ≤10 mA. **Usable battery
capacity** initially uses 2000 mAh, the nominal capacity, not a measured value.
After removing USB, the estimate appears after at least one minute of discharge.
Current samples estimate remaining charge; brief Wi-Fi peaks, ageing, temperature
and capacity errors can substantially affect the result. This is not guaranteed
runtime or a precision fuel gauge. Runtime stays unknown with USB connected.
Restart, capacity changes or measurement gaps over 20 seconds require a new full
confirmation. Missing measurements clear voltage, warning, charging and runtime
within approximately 25 seconds, rather than leaving stale values visible.

### First hardware checks

1. Compare voltage with the multimeter; current should be positive without USB.
2. Connect USB: source should change to USB. A partly charged cell should show
   negative current and Charging.
3. Remove USB: source should change to Battery and current become positive.
4. Confirm a full battery, then check the estimate after one minute of discharge.
5. A failed sensor must clear its dependent readings while opening detection continues.

Component reference: [ESPHome INA219](https://esphome.io/components/sensor/ina219/).

## Dashboard entities

| Entity suffix | Values | Requirement |
|---|---|---|
| `sensor.*_battery_voltage` | Voltage in V, or unknown/unavailable | INA219 bus plus signed shunt voltage |
| `sensor.*_power_source` | `usb`, `battery`, or `unknown` | Verified USB-presence measurement |
| `sensor.*_charging_status` | `charging`, `discharging`, `not_charging`, or `unknown` | Signed battery current and USB detection; no automatic full indication |
| `sensor.*_estimated_runtime` | Estimate in hours, or unknown/unavailable | Measured consumption and a calibrated usable-capacity estimate; clear the estimate while charging or when inputs are invalid |
| `binary_sensor.*_battery_low` | on/off or unknown/unavailable | Validated real battery voltage; existing simulated warning remains separate |

Replace `*` with the configured prefix. Legacy German firmware uses
`sensor.katzenklappe_akkuspannung` and `binary_sensor.katzenklappe_akku_niedrig`.
The three new suffixes are the same for both firmware variants.

GPIO0/D0 is already used by the inside contact. Do not apply the generic Seeed
A0 battery-divider example to that occupied input. This package uses I²C instead.

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
