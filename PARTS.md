# Parts list

> **Prototype update:** The black INA3221 module is installed instead of the INA219; initial USB-powered charging readings are confirmed. Its actual wiring, package and measurement status are documented in [INA3221.md](INA3221.md). The existing USB divider uses 8.2 kΩ / 12 kΩ; these do not need replacing with 68 kΩ / 100 kΩ.

**English** | [Deutsch](PARTS.de.md)

## Advertising / affiliate disclosure

The Amazon links below are affiliate links. As an Amazon Associate I earn from qualifying purchases. Buying through these links may support this project. You can also purchase equivalent parts elsewhere.

## Minimum hardware for opening detection

| Quantity | Part | Purpose and selection notes | Amazon.de |
|---|---|---|---|
| 1, if not already fitted | NAMSAN screen-door cat flap, S, black | The flap used for this project. Listing dimensions: outer frame 25 × 31.5 cm, inner opening 21 × 24.5 cm. Keep an existing suitable flap. | [NAMSAN S, black — affiliate link](https://www.amazon.de/dp/B0BVF4BRD7?th=1&linkCode=ll2&tag=xerexexe-21&linkId=c1c59964c58e61a4e0c86007af9d7788&ref_=as_li_ss_tl) |
| 1 | Seeed Studio XIAO ESP32-C6 | Runs ESPHome and connects to Home Assistant. Use the C6 model specified by this project. | [XIAO ESP32-C6 — affiliate link](https://www.amazon.de/dp/B0D2NKVB34?th=1&linkCode=ll2&tag=xerexexe-21&linkId=bba6cd061ce635df290c3ba6b551c2d3&ref_=as_li_ss_tl) |
| 2 contacts | Wired reed contacts with magnets | Detect inward/outward flap movement. The linked Gebildet black E1183 pack contains two contact sets with changeover contacts and magnets. | [Two contact sets — affiliate link](https://www.amazon.de/dp/B0C9KQRSV2?th=1&linkCode=ll2&tag=xerexexe-21&linkId=62cf6252d4e119858257c1d33c1658ba&ref_=as_li_ss_tl) |
| 1, for battery operation | Protected 3.7 V single-cell LiPo, approximately 2000 mAh | EEMB LP103454RP is a candidate with PCM protection according to its listing. The XIAO has battery solder pads; its JST connector is **not a direct plug-in connection**. | [EEMB 2000 mAh — affiliate link](https://www.amazon.de/EEMB-2000mAh-Lithium-Polymer-JST2-0-Stecker/dp/B0B7N2T1TD?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dib=eyJ2IjoiMSJ9.s48hNAQtAlYEKRBmSWyoHtwE2_HX-mXzuSPtnJsvPippCB_4mRP4Uyc1vY7ZU9PSvfrPhaORm0hjLViwGwS2ufVargGViwdkArg4i8D1LB8QkYHK1viXctzPGViMrFRFI1PNSI2k-f5di9N5rGRO11lpZtK2IcSIsIVYaKkUH19tAakU66jILQIM2tHZScXxKtdDD0BplKYqhgv98qJXbeFqcl4bQwnax6T_pYm5SvPLdPfA8yFmrDpSLl_qL7j-E2-dl9rXU0rWOO8ykp1YSYLI_Nr6mkGEcIiQBknlR4s.9_X7atOe-wkeNcazDFP21F6t3qluQRc8cv_RL0rVy04&dib_tag=se&keywords=LiPo%2B3.7V%2B2000mAh%2BSchutzschaltung&qid=1791102150&s=ce-de&sr=1-7&th=1&linkCode=ll2&tag=xerexexe-21&linkId=d8fc50939a33134f84f84cfd6710724c&ref_=as_li_ss_tl) |

Battery and reed contacts are connected to the prototype. Battery-powered Home Assistant connectivity and a real opening notification have been confirmed. Mounting on the flap, long-term operation and battery life still need testing. Software tests can also run with the ESP powered over USB.

## Assembly notes

- The reed circuit must be open when its magnet is away and close when the magnet approaches. Alarm-contact NO/NC labels can refer to the door state: select the correct pair by continuity measurement, rather than relying on wire colors or labels. Connect one contact between D0/GPIO0 and GND and the other between D1/GPIO1 and GND. Insulate the unused changeover wire.
- Both contacts should be inactive in the flap's resting position. Check switching range, return swings and nearby closure magnets during mounting. The linked contact housing is approximately 29 × 15 × 9 mm according to the listing.
- For the battery, confirm a 4.2 V charge limit, polarity and allowed charging current against the battery and [XIAO documentation](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/). Allow space outside the frame; the listing gives approximately 34.5 × 56 × 10.3 mm. Continuous Wi-Fi and the current firmware are not optimized for long battery life. Real battery-voltage measurement is not connected yet.
- Wire, insulation and printed mounts are assembly materials. No breadboard, jumper kit or general component assortment is required by this list. The electronics enclosure and holders are planned for 3D printing; printable models are not included yet.

## Additional parts for real power monitoring

Add **one INA219 module with an R100 (0.1 Ω) shunt**, **one 68 kΩ 1% resistor** and **one 100 kΩ 1% resistor**. No additional charger or breadboard is needed. The module goes into the positive battery lead, preserving existing BAT solder joints. See [the complete wiring and firmware instructions](POWER-MONITORING.md). Physical tests remain pending.


A documented module candidate is [Soldered 333066 on Amazon](https://www.amazon.de/dp/B0FY6LGK9G) (ordinary product link), with a 0.1 Ω shunt and a board footprint of 38 × 22 mm according to [the manufacturer](https://docs.soldered.com/ina219/overview/). VIN+/VIN− may be labelled IN+/IN−. Allow extra room for terminals and wires.

## Later expansion

RFID reader, antenna and power-saving hardware are deferred. There is no validated reader or antenna design to buy from this project yet. An antenna coil alone cannot read an implanted animal chip. These additions will get their own parts list after the interfaces and electrical requirements are established.

The listing information was reviewed on 2026-10-04. Prices, sellers, availability and product variants may change; check the selected variant before ordering. No prices or product images are copied here.
