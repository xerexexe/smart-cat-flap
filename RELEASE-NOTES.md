# Smart Cat Flap v0.1.0-beta.3

**Beta / prerelease** for Seeed Studio XIAO ESP32-C6, ESPHome and Home Assistant.

The optional local dashboard card now follows the Home Assistant profile language: German or English. It translates labels and displayed direction, chip and battery results, including existing German firmware without reflashing. Test controls still appear only in Test mode. Fixed English and German dashboard templates are also included.

Opening and battery notification examples have a separate `notification_language: en` or `de` variable. Notifications run on the server and cannot follow the language of an active browser profile. Existing German automations can remain in use.

Read LOCALIZATION.md for installation, resource registration and legacy entity mappings. Four automated localization tests pass; both languages and test-area visibility were verified in a live HA dashboard with the original German firmware. Firmware is unchanged from beta.2 and has not been reflashed for this update.

RFID hardware, antenna tuning, real battery measurement, deep sleep and mechanical installation are still pending. Flap direction does not confirm a completed cat passage. Keep credentials local and configure your own notification target. No device-specific firmware binary is distributed.
