# Smart Cat Flap 🐈

**English** | [Deutsch](README.de.md)

**Beta · v0.1.0-beta.2**

Add opening detection and Home Assistant notifications to an existing cat flap in a fly screen using a **Seeed Studio XIAO ESP32-C6** and ESPHome. Two reed contacts detect which way the flap swings. Test mode lets you exercise the software before the sensors, battery and animal microchip reader arrive.

The original firmware was built and tested with **ESPHome 2026.9.1** on a real XIAO ESP32-C6. This release translates the examples into English and preserves their detection logic. Mechanical installation tests are still pending. Flap direction alone does not prove that a cat has completed a passage.

## Features and status

| Feature | Beta status |
|---|---|
| Two contacts on GPIO0/GPIO1 | Implemented; installation still needs physical testing |
| Inside, outside or unclear opening direction | Implemented; 50 ms debounce and 5 s quiet period |
| Phone notifications | HA automation examples; configure your own notification target |
| Clean dashboard | Test controls and results appear only when test mode is on |
| Virtual contacts | Implemented; physical inputs are ignored in test mode |
| Chip ID matching | Software and simulation available; no physical RFID reader yet |
| Battery warnings | Software and simulation available; no physical voltage measurement yet |
| Battery operation with deep sleep | Not implemented; development uses USB power |
| Antenna, reader driver and 3D printed parts | Planned; not included |

## Files

- `cat-flap.yaml`: complete ESPHome example. Use this as the device configuration.
- `secrets.example.yaml`: template for local credentials.
- `dashboard.yaml`: complete configuration for a dedicated HA dashboard.
- `homeassistant-automation.yaml`: phone notifications for opening events.
- `battery-notifications.yaml`: battery warnings and recovery notifications, with separate real and simulated events.
- `movement.yaml`, `extensions.yaml`: reference fragments already included in `cat-flap.yaml`. Do not add them again.
- `TESTING.md`: tests without additional hardware and known limitations.
- `CHANGELOG.md`: release history.

## Setup

1. Use ESPHome 2026.9.1. Home Assistant must support ESPHome event/text entities and the current automation syntax.
2. Copy `cat-flap.yaml` into your ESPHome configuration directory. For an existing device, preserve its device name, Wi-Fi, API and OTA settings when merging changes. Changing a device name can change its Home Assistant registration.
3. Copy `secrets.example.yaml` to a **local** `secrets.yaml` and replace every placeholder. Generate a valid ESPHome API encryption key; the template deliberately contains no usable key. Never commit the resulting secrets file.
4. Validate and compile with ESPHome, then perform the first installation over USB. The example enables encrypted API communication and encrypted ESPHome OTA updates. Your ESPHome and installed firmware must support this OTA feature.
5. Add the device using Home Assistant's ESPHome integration.
6. Paste each automation file into the YAML editor of a new automation. Replace **`notify.mobile_app_your_phone`** with your actual notification action. Check all entity IDs against your installation.
7. Create an empty dashboard under Settings → Dashboards and paste `dashboard.yaml` into its raw configuration editor. This replaces the selected dashboard configuration, so use a dedicated empty dashboard.
8. Exit edit mode and toggle Test mode. Home Assistant shows conditional cards in edit mode even when their conditions are not satisfied.

The English example uses the device name `smart-cat-flap`, friendly name `Smart Cat Flap` and entity prefix `smart_cat_flap_`. Custom names or existing entities with conflicting names require corresponding dashboard and automation changes. The device settings page still lists every entity; conditional visibility applies to the dashboard.

## Migrating from beta.1

Beta.2 uses English filenames, entity labels, internal identifiers, status messages and event types. Opening events are now `inside`, `outside`, `unclear`; battery events are `low`, `recovered`. Update the dashboard and both automations together with the firmware. Existing HA entity registry entries may retain earlier IDs after a firmware update: verify the actual IDs instead of assuming they were renamed automatically.

The running device is not updated by publishing this repository. If keeping a German installation, continue using the beta.1 examples or explicitly adapt the English files to its existing names and event types.

## Wiring the reed contacts

| Contact | XIAO ESP32-C6 |
|---|---|
| Inside: dry normally open contact | Between **D0 / GPIO0** and **GND** |
| Outside: dry normally open contact | Between **D1 / GPIO1** and **GND** |

Internal pull-ups are enabled. A closed contact to GND is active. For contacts with COM/NO/NC terminals, identify the normally open pair with a continuity test. Do not apply a supply voltage to these inputs. D0 is a board pin label; the firmware uses GPIO0.

A magnet moves with the flap. Both contacts should be inactive in its resting position. The inside contact should activate first when the flap swings inward; the outside contact should activate first when it swings outward. Existing closure magnets can interfere, so test contact placement on the physical flap.

## Detection and limitations

The first contact determines direction. If both are detected within 100 ms, the result is `unclear`. Another event is allowed only after both contacts have been inactive for five seconds. This quiet period also applies after boot and test mode changes.

This usually suppresses return swings. Two rapid real openings may be combined; a late return swing may count again. Counters start at zero after every ESP restart. Events lost during a connection outage are not replayed.

Two direction contacts do not provide a reliable persistent open/closed state. No locking actuator or access control is implemented. Chip matching reports the last reader result and is not yet associated with an opening.

## Future battery and RFID work

The original XIAO ESP32-C6 has a charging circuit for a suitable protected single-cell lithium battery rated at 3.7 V with a 4.2 V charge limit. Follow the board documentation for connections and polarity. The firmware currently has **no connected ADC measurement path and no software discharge protection**. Real low-battery notifications require the measurement circuit and adapter still to be added. Continuous Wi-Fi is not a low-power long-term operating mode.

An implanted animal microchip requires a reader compatible with the actual chip. FDX-B at 134.2 kHz is the current planning assumption. A passive antenna coil connected to GPIO pins does not replace a reader. Reader choice, antenna tuning, voltage levels and protocol remain to be determined; no speculative UART decoder is included.

## References

- [Seeed XIAO ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/)
- [ESPHome GPIO sensors](https://esphome.io/components/binary_sensor/gpio/)
- [ESPHome OTA](https://esphome.io/components/ota/esphome/)
- [Home Assistant conditional cards](https://www.home-assistant.io/dashboards/conditional/)

Report bugs and physical installation experience through GitHub Issues.
