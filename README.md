# Smart Cat Flap 🐈

**English** | [Deutsch](README.de.md)

**Beta · v0.1.0-beta.3**

Add opening detection and Home Assistant notifications to an existing cat flap in a fly screen using a **Seeed Studio XIAO ESP32-C6** and ESPHome. Two reed contacts detect which way the flap swings. Test mode lets you exercise the software before the sensors, battery and animal microchip reader arrive.

The original firmware was built and tested with **ESPHome 2026.9.1** on a real XIAO ESP32-C6. This release translates the examples into English and preserves their detection logic. Mechanical installation tests are still pending. Flap direction alone does not prove that a cat has completed a passage.

## 🛒 Parts for your build

**Advertising / affiliate links:** As an Amazon Associate I earn from qualifying purchases.

| Part | What it does | Shopping link |
|---|---|---|
| **XIAO ESP32-C6** · 1 board | ESPHome + Home Assistant connection | **[View on Amazon — affiliate link](https://www.amazon.de/dp/B0D2NKVB34?th=1&linkCode=ll2&tag=xerexexe-21&linkId=bba6cd061ce635df290c3ba6b551c2d3&ref_=as_li_ss_tl)** |
| **Reed contacts + magnets** · 1 pack, 2 sets | Detect the flap's opening direction | **[View on Amazon — affiliate link](https://www.amazon.de/dp/B0C9KQRSV2?th=1&linkCode=ll2&tag=xerexexe-21&linkId=62cf6252d4e119858257c1d33c1658ba&ref_=as_li_ss_tl)** |
| **Protected 3.7 V LiPo** · 2000 mAh candidate | Power the flap without a USB cable | **[View on Amazon — affiliate link](https://www.amazon.de/EEMB-2000mAh-Lithium-Polymer-JST2-0-Stecker/dp/B0B7N2T1TD?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dib=eyJ2IjoiMSJ9.s48hNAQtAlYEKRBmSWyoHtwE2_HX-mXzuSPtnJsvPippCB_4mRP4Uyc1vY7ZU9PSvfrPhaORm0hjLViwGwS2ufVargGViwdkArg4i8D1LB8QkYHK1viXctzPGViMrFRFI1PNSI2k-f5di9N5rGRO11lpZtK2IcSIsIVYaKkUH19tAakU66jILQIM2tHZScXxKtdDD0BplKYqhgv98qJXbeFqcl4bQwnax6T_pYm5SvPLdPfA8yFmrDpSLl_qL7j-E2-dl9rXU0rWOO8ykp1YSYLI_Nr6mkGEcIiQBknlR4s.9_X7atOe-wkeNcazDFP21F6t3qluQRc8cv_RL0rVy04&dib_tag=se&keywords=LiPo%2B3.7V%2B2000mAh%2BSchutzschaltung&qid=1791102150&s=ce-de&sr=1-7&th=1&linkCode=ll2&tag=xerexexe-21&linkId=d8fc50939a33134f84f84cfd6710724c&ref_=as_li_ss_tl)** |

**Already have a part? Keep using it.** USB power is enough for software testing. The linked sensor mounting and battery setup are still untested; the battery requires a connection to the XIAO's solder pads. See the **[full parts list and wiring notes](PARTS.md)** before ordering. Battery life and low-power operation are still being developed.

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

## Dashboard language

The optional automatic dashboard follows the Home Assistant profile language: German profiles get German labels and results; other languages use English. See [LOCALIZATION.md](LOCALIZATION.md) for installation. Existing German firmware is supported without reflashing. Entity names in device settings and detail dialogs remain as registered.

Phone notifications have a separate `notification_language: en` or `de` variable in each automation, because server-side notifications have no active browser profile.

## Files

- `cat-flap.yaml`: complete ESPHome example. Use this as the device configuration.
- `secrets.example.yaml`: template for local credentials.
- `dashboard-auto.yaml`, `frontend/smart-cat-flap-card.js`: dashboard following your HA profile language.
- `dashboard.yaml`, `dashboard.de.yaml`: fixed English/German dashboard labels.
- `LOCALIZATION.md`: automatic language setup and legacy German firmware support.
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

<details>
<summary>Migrating from beta.1</summary>

Beta.2 uses English filenames, entity labels, internal identifiers, status messages and event types. Opening events are now `inside`, `outside`, `unclear`; battery events are `low`, `recovered`. Update the dashboard and both automations together with the firmware. Existing HA entity registry entries may retain earlier IDs after a firmware update: verify the actual IDs instead of assuming they were renamed automatically.

The running device is not updated by publishing this repository. For a German installation, the automatic dashboard supports `entity_prefix: katzenklappe` with `legacy: true`; keep the existing German automations or adapt the examples to its event types. See LOCALIZATION.md.

</details>

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
