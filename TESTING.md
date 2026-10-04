# Testing the beta

## Previous hardware verification

The original German configuration was compiled and installed using ESPHome 2026.9.1 on a real XIAO ESP32-C6. These behaviors were checked before the English translation:

- Virtual openings inward, outward and simultaneous signals producing an unclear direction.
- Separate events and counters for real inputs and simulations.
- No repeated event while a test contact is held; return swings within the quiet period are suppressed.
- Own/unknown chip matching, invalid chip ID and no enrolled cat.
- Battery hysteresis: 3.40 V low; repeated low readings do not repeat the warning; 3.60 V remains low; 3.80 V triggers recovery.
- HA notification actions for openings and battery events completed without errors.
- On 2026-10-04, test mode showed all three test groups and switching it off hid them. The dashboard visibility test did not trigger simulated openings or battery warnings.

The English release preserves this logic but changes names, event types and displayed text. Before publication, all seven YAML examples were parsed with duplicate-key checks; all 27 entity names and 36 internal IDs were checked for consistent references. The reference fragments match the complete configuration, and executable tokens in all eight C++ lambdas match beta.1 after identifier and text translation. Documentation links were also checked.

These checks do not replace an ESPHome compilation of the translated examples or tests with mounted reed contacts, a real cat, RFID reader or battery. English examples have not been flashed onto the existing German installation.

## Localization verification (beta.3)

- Run `node --test tests/localization.test.mjs` with Node.js 20 or newer: four tests cover profile language, regional/fallback selection, bilingual state values, legacy entity mapping, and unchanged conditions/control targets.
- Live HA profile switching from German to English and back translated dashboard labels, result rows and legacy event types. All three test groups appeared in both languages with Test mode on, then disappeared when it was turned off.
- The profile was restored to German and Test mode was disabled after verification. No simulated opening, chip or battery action was triggered during the language checks.
- All current YAML examples were parsed with duplicate-key detection. Notification templates were rendered for German/English, real/test events and all supported event types; invalid/startup events were checked against their guards.
- ESPHome firmware is unchanged from beta.2. These checks do not constitute a new hardware or firmware compilation test.

## Simulate an opening

1. Open the dashboard, enable Test mode and wait five seconds for Detection ready.
2. Enable Test inside contact: one inside test opening. The real counter remains unchanged.
3. Disable inside and enable outside: a return swing within the quiet period must not produce another event.
4. Disable both, wait five quiet seconds, then enable outside: one outside test opening.
5. Held contacts must not repeat. To test `unclear`, enable both switches using one HA action; two manual clicks are not reliably within 100 ms.
6. Disable Test mode: virtual contacts reset, the test area disappears, and physical contacts are used after the quiet period.

To test a physical input in normal mode, bridge GPIO0 or GPIO1 to GND. Only bridge the specified signal pins, not supply pins. Leave both inputs inactive for five seconds between attempts.

## Simulate chip matching

Use invented test IDs only, such as `123456789012345`.

1. Enable Test mode. Set Allowed chip ID and Test chip ID to the same invented number.
2. Press Test read chip: the result should be `own cat`.
3. A different 15-digit number gives `unknown chip`; `abc` gives `invalid chip ID`.
4. Clear Allowed chip ID and simulate a valid test ID: `no cat enrolled`.
5. Restore or clear the saved allowed ID after testing. This field is the real persistent configuration.

Spaces and hyphens are removed, leading zeros are preserved. Other characters or a length other than 15 are invalid. IDs are not written to firmware logs. Real RFID match remains unknown without hardware.

## Simulate battery warnings

1. Enable Test mode. Set Test battery voltage to 3.40 V and press Test check battery.
2. Check again: no additional warning event.
3. Check 3.60 V: still low.
4. Check 3.80 V: sufficient, with one recovery event.
5. Disable Test mode. Test buttons do nothing outside this mode.

Editing the numeric field alone does not run a check. Preliminary thresholds are low at or below 3.50 V and recovery at or above 3.65 V. Voltage is not a percentage estimate. Readings outside 2.5–4.3 V are rejected. Warning states reset after an ESP restart.

Test results remain stored after Test mode is disabled but are hidden on the dashboard. Real battery values remain unknown until a physical measurement circuit and its adapter are added.

## Pending verification

Physical placement and return swings, short contact pulses, actual cat passages, real chip reads and timing, ADC calibration, battery life, deep sleep retaining the first contact signal, and Wi-Fi outage behavior.
