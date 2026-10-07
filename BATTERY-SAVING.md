# Battery saving and reliable opening delivery (experimental)

This optional extension turns Wi-Fi off between reports and uses short light-sleep periods. Reporting defaults to **5 minutes**; a contact activation wakes the device and starts a connection attempt immediately. Notification arrival still depends on Wi-Fi, Home Assistant and the phone push service. Actual battery life has not yet been measured with this mode.

## Installation

Copy `event-journal.h`, `reliable-delivery.yaml` and `battery-saving.yaml` beside the device configuration. The saving package requires the existing USB detection circuit on GPIO21 and active-low contacts on GPIO0/1. Keep auxiliary YAML files in a subfolder if your Device Builder lists them as separate devices, and adjust include paths accordingly. The header must stay beside `reliable-delivery.yaml`.

Merge these packages with existing packages (including the INA3221 monitor), without adding a second `packages:` key:

```yaml
packages:
  delivery: !include reliable-delivery.yaml
  saving: !include battery-saving.yaml
```

Create the Home Assistant text helper `input_text.smart_cat_flap_last_delivered_opening`, maximum length 40. Alternatively, load `reliable-opening-helper.yaml` as a Home Assistant configuration package. **Replace** the old opening notification automation with `reliable-opening-automation.yaml`. Set its device name, payload sensor, acknowledgement action and phone notification action to the actual installation. Keep the battery notification automation. No additional permission to execute Home Assistant actions from the ESP is needed.

For the existing German prototype, add these substitutions to the device configuration:

```yaml
substitutions:
  delivery_opening_id: oeffnung
  delivery_test_opening_id: testoeffnung
  saving_ready_id: bereit
  saving_pending_id: richtung_offen
  saving_test_mode_id: testmodus
  saving_inside_contact_id: kontakt_innen
  saving_outside_contact_id: kontakt_aussen
  saving_opening_id: oeffnung
  saving_test_opening_id: testoeffnung
```

Its automation uses `device_name: katzenklappe-smart`, `notification_language: de`, `sensor.katzenklappe_pending_opening_payload` and `esphome.katzenklappe_smart_acknowledge_opening`. Verify entity/action IDs in Home Assistant; registry names can differ.

## Operation

- **Experimental battery saving** starts OFF after every restart. Enable it only after testing real contacts.
- **Reporting interval** is adjustable from 1 to 60 minutes and survives restarts.
- USB power, Test mode or an active contact keeps Wi-Fi awake. Plugging USB back in wakes the device for updates.
- A report window stays open at least 10 seconds. An unsuccessful connection/delivery attempt ends after 60 seconds and retries on the next reporting cycle. The interval starts when Wi-Fi switches off, so reports are approximately the interval plus the connection window apart.
- Light sleep retains the detector and its RAM state, unlike a reset. Short 50 ms sleep periods allow normal component timers and INA measurements to continue. This reduces the scope of the first implementation; it does not establish a particular power saving.
- Contacts and USB detection use polling because GPIO wake-up changes the hardware interrupt configuration. Very short pulses can be missed; check magnet placement and hold a test contact active for at least 100 ms.
- The module LEDs and INA3221 remain powered. No hardware changes are required for this extension.

## Buffer and limits

Up to **256 opening records** are held in a FIFO journal, including direction, test flag, device timestamp and unique event ID. Each append is written to flash before delivery. Only acknowledgement of the oldest event ID removes a record; stale acknowledgements cannot delete a newer opening. Retries use the native API text sensor and repeat every 10 seconds while connected.

Home Assistant sends the notification, records its ID in the helper and then acknowledges it. Duplicate retries are acknowledged without another notification. A stable Android notification tag also limits duplicate visible notifications if Home Assistant stops between sending and saving the helper. This is **at-least-once delivery**, not an exactly-once guarantee. The acknowledgement confirms acceptance by the HA notification action, not receipt or reading on the phone. Do not manually run the automation without a state trigger.

A full journal rejects additional openings and increments **Opening buffer overflows**. **Opening storage error** indicates a flash write problem; pending RAM records are not protected against power loss until storage works again. Flash has finite write endurance. Do not continuously generate test openings. Erasing flash or changing the journal format can remove stored records.

If the device clock was not synchronized, the record stores zero and the notification says its original time is unavailable. It never substitutes delivery time for opening time. Existing event entities remain useful for online history; the journal is the delivery source. Existing opening counters still restart at zero.

## Validation and battery estimate

Validate/compile the combined configuration before installing. Test inside, outside, both contacts together, a temporarily disabled notification automation, retries and restart persistence. Then enable battery saving, unplug USB, check contact wake-up and the periodic report, and compare measured consumption. Leave saving OFF if physical wake-up tests fail.

Prototype checks on 2026-10-07: combined ESPHome 2026.9.1 build and journal compile-time checks passed; an inside test record was acknowledged by HA, and an outside record survived an OTA restart with the same ID and original timestamp before delivery. Dashboard localization checks passed. Physical sleep/wake and five-minute report tests are still pending.

The existing runtime estimate integrates sampled battery current and requires a user-confirmed full battery after a restart. Sparse INA samples can miss short Wi-Fi current peaks; runtime remains approximate. Earlier example lifetimes based on assumed active/sleep currents are not measurements of this implementation.
