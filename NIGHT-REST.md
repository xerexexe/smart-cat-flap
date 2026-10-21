# Optional night rest

[Deutsch](NIGHT-REST.de.md)

Included with `battery-saving.yaml`. Copy `night-rest.yaml` and `night-schedule.h` beside that package. Requires its USB detection, reliable delivery and clock. Updated dashboard controls appear with `reliable_delivery: true`; reload the card resource if necessary.

The dedicated **Night rest** card displays a 24-hour schedule: gold for detection, purple for scheduled rest, and a marker for the current local time. Choose whole hours using **Rest starts** / **Detection resumes** and enable the schedule with the top switch. Disabled schedules are labelled as previews. USB/Test-mode and offline guidance are separate; expandable details explain the behavior.

Current resource: `/local/smart-cat-flap-card.js?v=20261018-night-graphic2`. Set the dashboard's `night_timezone` to match any firmware timezone override. During radio pauses, last reported settings remain visible and unavailable controls are disabled. The graphic describes a schedule, not confirmed physical sleep.

- **Night rest** defaults OFF on first installation and remembers your choice. Start/end hours default to **22 / 6**, with an exclusive end. Equal hours disable the window; daytime windows also work.
- Default timezone: **Europe/Berlin**, including DST. Override `saving_timezone` elsewhere. Without a valid clock the ESP stays awake.
- Timer-only deep sleep deliberately disables detection, RFID processing, new buffer entries, notifications and periodic reports. Overnight openings are not recorded/replayed. The flap remains mechanically usable.
- Entry allows a 60-second delivery/maintenance window. Active contacts or unfinished detection delay entry. Pending events remain in flash even without HA; a storage failure prevents sleep. Delivery resumes after wake-up.
- USB detected **before entry**, or Test mode, prevents sleep. Night rest is independent of daytime battery saving; previously enabled daytime saving resumes after timer wake-up.
- Wi-Fi/remote controls are unavailable asleep. **USB alone cannot wake timer-only deep sleep.** For early maintenance, connect USB and press Reset; reset also provides a 60-second recovery window. RTC drift and network reconnect can delay the morning report.
- Deep sleep restarts the ESP: restart-only counters reset, while the journal and persisted calibration/settings survive.

This is software sleep, not complete power isolation. INA3221, LEDs and externally powered electronics remain supplied. The future RFID reader requires separately tested standby control. No new parts are needed for this ESP sleep option. Savings remain unmeasured. Current integration does **not** measure the overnight gap, so remaining charge/runtime can be optimistic.

## Physical check

Prototype deployment on 2026-10-18: built using the backed-up installed configuration and uploaded successfully over encrypted OTA. API verification confirmed Night rest OFF, start 22 and end 6. Previous daytime saving ON was restored. The updated HA card displays all three controls. Actual overnight sleep/timer wake-up remains untested.

On USB enable night rest and verify continued availability. For a short battery test, set start to the current local hour and end to the next hour. Disconnect USB and keep contacts inactive; verify sleep after the entry window, timer wake-up, normal contact notifications and pending-event delivery. Restore 22 / 6 afterward. To abort, connect USB and press Reset. Configuration/build tests do not replace this physical check; no successful hardware wake-up test is claimed.

References: [ESPHome deep sleep](https://esphome.io/components/deep_sleep/), [ESP32-C6 sleep modes](https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-reference/system/sleep_modes.html).
