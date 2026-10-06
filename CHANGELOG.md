# Changelog

## Unreleased — 2026-10-06

- Round dashboard voltage to two decimal places using the selected language; update English/German documentation to the installed INA3221 prototype and confirmed USB-powered charging readings.

- Make INA3221 I2C pins configurable; adapt the physical prototype to SDA on D5 and SCL on D4 without resoldering.
- Verify detection at address 0x40 after encrypted OTA; investigate connection interruptions before confirming physical battery measurements.
- Observe initial USB-powered battery readings around 3.71 V and −0.114 A with Charging shown in Home Assistant; battery-only stability and runtime calibration remain pending.

## Unreleased — 2026-10-05

- Add an INA3221 channel-1 measurement package for the ordered black module; missing hardware leaves battery measurements unknown. Document contradictory seller diagrams and pending physical terminal verification.
- Compile and install the INA3221 prototype firmware through encrypted OTA; verify reconnection, USB source and unknown battery measurements with the module absent.

- Standalone USB/battery source detection on D3; works without the INA219. Documented the tested 8.2 kΩ / 12 kΩ divider alternative.

- Opening pushes keep separate notifications and include the event time.
- High Android delivery priority with a one-day TTL for offline phones.
- Re-arm after 500 ms with both contacts inactive, replacing the five-second quiet period.
- Automatic dashboard prepares battery voltage, source, charging, runtime and warning rows; absent measurements remain Unknown.
- Optional INA219 power-monitoring package and complete English/German wiring plan; physical installation and measurement tests remain pending.
- Fix the complete example's OTA configuration: encrypted OTA cannot also set an OTA password.

## v0.1.0-beta.3 — 2026-10-04

- Optional local dashboard card follows the HA profile language (German/English).
- Translated displayed direction, chip and battery states, including legacy German firmware.
- Fixed German dashboard template alongside the English template.
- Separate German/English notification language variable in both automation examples.
- Added setup documentation and four automated localization tests.
- Live profile switching and test-area visibility verified in Home Assistant.
- Firmware and physical detection logic are unchanged.

## v0.1.0-beta.2 — 2026-10-04

- English documentation, filenames, code identifiers, entity labels, dashboard and phone messages.
- English event types: `inside`, `outside`, `unclear`, `low`, `recovered`.
- Additional German setup guide in `README.de.md`.
- Documented migration from beta.1; existing German installations are not updated automatically.
- Detection timing, counters, chip normalization and battery thresholds are unchanged.

## v0.1.0-beta.1 — 2026-10-04

First public prerelease for Seeed Studio XIAO ESP32-C6, ESPHome and Home Assistant.

- Opening direction detection using two reed contacts, debounce and quiet period.
- Separate real and simulated opening events.
- Clean HA dashboard showing test controls only while test mode is enabled.
- Software adapters and simulations for animal chip matching and battery warnings.
- Phone notification automation examples.
- Local credentials through secrets.yaml; encrypted API and OTA in the example.

RFID hardware, physical battery measurements, deep sleep and mechanical installation remain unfinished.
