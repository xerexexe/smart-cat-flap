# Smart Cat Flap v0.1.0-beta.2

English **beta / prerelease** for Seeed Studio XIAO ESP32-C6, ESPHome and Home Assistant.

This version translates documentation, filenames, code identifiers, entity labels, dashboard controls and phone notifications into English. A German setup guide is also available in README.de.md.

Opening detection uses two contacts. The dashboard shows contact, chip and battery tests only while Test mode is enabled. Detection logic and timings are unchanged from beta.1.

**Migration:** Entity names and event types have changed. Update firmware, dashboard and automations together and verify the actual HA entity IDs. Opening event types are now inside/outside/unclear; battery events are low/recovered. Publishing this release does not modify an existing installation.

The original configuration was tested on a real XIAO ESP32-C6 with ESPHome 2026.9.1. The English examples have not been flashed onto that installation. Real RFID reading, antenna tuning, battery measurement and deep sleep remain pending. An opening direction does not confirm a completed cat passage.

Read README.md and TESTING.md for setup and tests. Store credentials locally in secrets.yaml and configure your own phone notification action. Source archives are available below; no device-specific firmware binary is distributed.
