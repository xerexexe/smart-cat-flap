# Changelog

## Unreleased — 2026-10-21

- Replace the short-window runtime forecast with optional local SQLite battery history in Home Assistant: rolling 30-day learning, daily/weekly groups, persistent device consumption counters across radio pauses, explicit reset/night gaps and localized dashboard learning progress. Keep the full-battery calibration.

- Add an on-demand Wi-Fi access-point check under diagnostics using wifi.roam; keep automatic repeated scans out of the battery reporting loop.

- Upgrade to stable ESPHome 2026.10.0 and enable encrypted outgoing API connections with a five-second fallback delay for short reporting windows. Home Assistant 2026.10 or later is required for outgoing connections.

## Unreleased — 2026-10-19

- Include estimated runtime in the compact home overview tile and retain its last report during radio pauses.

- Display estimated battery runtime of at least 24 hours as days and whole hours throughout the dashboard, localized in English and German; keep shorter estimates in hours.

- Show battery current in mA, estimated charge, configured capacity and estimate quality under Power & device. Explain charging/discharging signs and include physical reed contacts in diagnostics.

- Preserve INA3221 full-battery reference, remaining charge and learned load across measurement failures; mark resumed estimates uncertain after gaps/restarts. Keep live readings unknown during faults, flush full confirmations to flash and show estimate quality in both dashboard sizes.

- Initialize the XIAO ESP32-C6 RF-switch power and built-in antenna selection at hardware setup priority, before Wi-Fi starts. Keep this board-specific configuration in a separate package.
- Animate the cat with breathing, blinking and tail motion; add an outside tree and colour only a thin strip at the top of the status tile by battery level, keeping cat/control accents turquoise.
- Fix photo loading while HA prepares cards before DOM attachment. Normalize doubled media-path separators, avoid a trailing slash in the upload destination, and show the shared cat photo in the compact title too.


- Keep battery waves moving during discharge and radio pauses at the last valid reported fill level. Colour the battery green above 50%, orange from 10% through 50% and red below 10%; retain reduced-motion support.


## Unreleased — 2026-10-18

- Enlarge the compact cat/flap illustration into the available space between location controls and the battery, using a taller flap graphic.


- Add shared, persisted estimated cat location with manual inside/outside/unknown corrections and a small cat/flap graphic in both dashboard sizes. Ignore tests and older replayed records; preserve measured direction history.


- Add a compact home overview card with flap status, direction and calibrated battery waves; retain timestamped battery readings during radio pauses.


- Replace the looping fill with two gentle charging waves at the calibrated estimated charge level. Expose INA3221 remaining charge as a battery percentage; unknown calibration stays unknown.
- Add direct photo selection on phones and PCs, automatic resizing/metadata removal and authenticated upload to Home Assistant media.


- Redesign the complete responsive dashboard with an illustrated status header, flap activity, energy and expandable settings/diagnostics.
- Add an optional shared cat photo for the dashboard and reliable opening pushes; keep the original delivery acknowledgement and duplicate suppression.
- Animate the battery filling while a connected device reports charging. Honour reduced motion; stop animation for retained/offline readings. The animation does not represent measured charge percentage.


- Replace the plain night-rest rows with a dedicated localized card: 24-hour graphic, current-time marker, clock selectors, USB/offline guidance and expandable explanations. Verify a start-time change updates the live schedule/duration, then restore 22:00–06:00.

- Add optional night rest, initially OFF, with persisted enable/start/end controls (default 22:00–06:00 Europe/Berlin). Timer deep sleep omits overnight detection/reports and retains pending events in flash.
- Add localized controls and document reset recovery, external electronics remaining powered and unmeasured overnight consumption. Hardware verification remains pending.
- Build from the backed-up installed prototype configuration, install via encrypted OTA and verify OFF/22/6 through the API and HA dashboard. Restore prior daytime saving ON; actual overnight wake-up testing remains pending.

## Unreleased — 2026-10-08

- Preserve learned battery-mode consumption on USB and show its runtime forecast while externally powered. Persist INA3221 calibration, remaining charge and learned consumption across restarts.
- Poll INA3221 measurements on elapsed time while manually sleeping to prevent false stale-measurement invalidation.
- Retain timestamped battery readings in the localized dashboard during Wi-Fi pauses; explicit unknown readings still replace earlier values.

- Use the sleep-aware ESP timer for reporting, delivery retry deadlines and battery-current integration. ESPHome 2026.9.1's `millis()` uses FreeRTOS ticks, which can lag behind elapsed time during manual light sleep.
- Log radio-off deadlines and reporting-window starts to diagnose real reporting intervals.

## Unreleased — 2026-10-07

- Allow state delivery after HA reconnects, publish pending counts immediately after acknowledgement, and include small discharge currents in runtime averaging.
- Add optional experimental battery saving: configurable reporting (default 5 minutes), contact/USB wake-up and short light sleep; OFF after restart. Actual power savings remain unmeasured.
- Add a persistent FIFO for 256 opening records, native-API payload delivery, matching-head acknowledgement and overflow/storage diagnostics. Provide a replacement HA notification automation with duplicate suppression and original event time.
- Add optional localized dashboard controls with `reliable_delivery: true` and setup/limitations documentation in English and German.
- Apply consistent dashboard precision to all numeric measurement rows: voltage (2 decimals), runtime (1), current in amperes (3), and counters/capacity/percent (0). Include test readings; preserve chip IDs, event timestamps and unknown values.

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
