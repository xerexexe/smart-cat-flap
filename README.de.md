[English](README.md) | **Deutsch**

# Katzenklappe smart 🐈

**Beta · v0.1.0-beta.3**

Eine vorhandene Katzenklappe im Fliegengitter mit einem **Seeed Studio XIAO ESP32-C6**, ESPHome und Home Assistant erweitern. Zwei Reedkontakte erfassen die Schwenkrichtung. Home Assistant meldet Öffnungen auf dem Handy. Ein Testmodus ermöglicht Tests der Erkennung, Meldungen und späteren Erweiterungen.

**Aktueller Aufbau · 06.10.2026:** Akku, Reedkontakte und das schwarze INA3221-Modul sind angeschlossen. Die Firmware wurde auf **SDA an D5/GPIO23 und SCL an D4/GPIO22** angepasst; das Modul wird unter `0x40` erkannt. Mit USB zeigte Home Assistant etwa **3,71 V**, **114 mA Ladestrom** und **Lädt**. Verbindungsabbrüche im reinen Akkubetrieb müssen noch untersucht werden; Laufzeitkalibrierung, Akkulaufzeit und Montage im Rahmen stehen aus. Siehe [aktuelle Verdrahtung und Messstand](INA3221.de.md). Dieser Stand liegt im `main`-Branch; der letzte veröffentlichte Release-Tag bleibt `v0.1.0-beta.3`.

<details>
<summary>Kleiner Projektverlauf – was wir bisher gemacht haben</summary>

- ESP eingerichtet und mit Home Assistant verbunden.
- Öffnungsrichtung und Handy-Meldungen programmiert und getestet.
- Testfelder im Dashboard hinter dem Testmodus versteckt; Deutsch und Englisch ergänzt.
- Reedkontakte und Akku angeschlossen; Akkubetrieb und eine echte Öffnungsmeldung bestätigt.
- Schnelle Folgemeldungen verbessert: kürzere Ruhezeit, einzelne Benachrichtigungen mit Ereigniszeit.
- Festgestellt, dass der Akkuanschluss allein keine Ladeerkennung oder Akkumesswerte an die Software liefert.
- Messschaltung mit INA219 und USB-Erkennung entwickelt; Firmware kompiliert und Verdrahtung dokumentiert.
- Als Nächstes: Akkubetrieb stabilisieren, Restlaufzeit kalibrieren und den Aufbau am Rahmen montieren. Tierchip-Leser bleibt zurückgestellt.

- INA3221 angeschlossen, SDA/SCL in der Firmware ohne erneutes Löten angepasst und erste Messwerte sowie Ladeerkennung mit USB bestätigt.
- Spannungsanzeige auf zwei Nachkommastellen gerundet; das Dezimalzeichen folgt der gewählten Sprache.

</details>

Die ursprüngliche deutsche Firmware wurde mit ESPHome **2026.9.1** auf einem echten XIAO ESP32-C6 getestet. Die englische Übersetzung behält die Erkennungslogik bei, wurde aber nicht auf die bestehende Installation geflasht. Mechanische Tests an der eingebauten Klappe stehen noch aus. Die Schwenkrichtung ist kein Nachweis, dass eine Katze vollständig hinein- oder hinausgelaufen ist.

Verwendet wird die **NAMSAN Fliegengitter-Katzenklappe, Größe S, Schwarz** (Außenrahmen 25 × 31,5 cm; innere Öffnung 21 × 24,5 cm laut Angebot). Die Sensormontage an dieser Klappe steht noch aus.

## 🛒 Teile zum Nachbauen

**Werbung / Affiliate-Links:** Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.

| Bauteil | Wofür es gebraucht wird | Einkaufslink |
|---|---|---|
| **NAMSAN Fliegengitter-Katzenklappe** · S, Schwarz | Die im Projekt verwendete Klappe; eine vorhandene passende weiterverwenden | **[Auf Amazon ansehen — Affiliate-Link](https://www.amazon.de/dp/B0BVF4BRD7?th=1&linkCode=ll2&tag=xerexexe-21&linkId=c1c59964c58e61a4e0c86007af9d7788&ref_=as_li_ss_tl)** |
| **XIAO ESP32-C6** · 1 Board | ESPHome und Verbindung zu Home Assistant | **[Auf Amazon ansehen — Affiliate-Link](https://www.amazon.de/dp/B0D2NKVB34?th=1&linkCode=ll2&tag=xerexexe-21&linkId=bba6cd061ce635df290c3ba6b551c2d3&ref_=as_li_ss_tl)** |
| **Reedkontakte + Magnete** · 1 Packung, 2 Sets | Erkennen die Öffnungsrichtung der Klappe | **[Auf Amazon ansehen — Affiliate-Link](https://www.amazon.de/dp/B0C9KQRSV2?th=1&linkCode=ll2&tag=xerexexe-21&linkId=62cf6252d4e119858257c1d33c1658ba&ref_=as_li_ss_tl)** |
| **Geschützter 3,7-V-LiPo** · 2000-mAh-Kandidat | Stromversorgung ohne USB-Kabel | **[Auf Amazon ansehen — Affiliate-Link](https://www.amazon.de/EEMB-2000mAh-Lithium-Polymer-JST2-0-Stecker/dp/B0B7N2T1TD?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dib=eyJ2IjoiMSJ9.s48hNAQtAlYEKRBmSWyoHtwE2_HX-mXzuSPtnJsvPippCB_4mRP4Uyc1vY7ZU9PSvfrPhaORm0hjLViwGwS2ufVargGViwdkArg4i8D1LB8QkYHK1viXctzPGViMrFRFI1PNSI2k-f5di9N5rGRO11lpZtK2IcSIsIVYaKkUH19tAakU66jILQIM2tHZScXxKtdDD0BplKYqhgv98qJXbeFqcl4bQwnax6T_pYm5SvPLdPfA8yFmrDpSLl_qL7j-E2-dl9rXU0rWOO8ykp1YSYLI_Nr6mkGEcIiQBknlR4s.9_X7atOe-wkeNcazDFP21F6t3qluQRc8cv_RL0rVy04&dib_tag=se&keywords=LiPo%2B3.7V%2B2000mAh%2BSchutzschaltung&qid=1791102150&s=ce-de&sr=1-7&th=1&linkCode=ll2&tag=xerexexe-21&linkId=d8fc50939a33134f84f84cfd6710724c&ref_=as_li_ss_tl)** |

**Schon vorhanden? Weiterverwenden.** Für Softwaretests genügt USB-Strom. Akku und Kontakte sind am Prototyp angeschlossen und getestet; die Montage an der Klappe steht noch aus. Der Prototyp nutzt jetzt den INA3221 für echte Akkuwerte. Der USB-Spannungsteiler ist mit 8,2 kΩ und 12 kΩ bereits aufgebaut. Vor dem Bestellen die **[vollständige Teileliste mit Anschlussinfos](PARTS.de.md)** lesen. Akkulaufzeit und Stromsparbetrieb werden noch entwickelt.

## Funktionen und Stand

| Funktion | Beta-Stand |
|---|---|
| Zwei Kontakte an GPIO0/GPIO1 | Implementiert; mechanische Montage noch zu testen |
| Öffnungsrichtung innen, außen oder unklar | Implementiert; 50 ms Entprellung und 0,5 s Ruhezeit |
| Handy-Benachrichtigungen | Echte und simulierte Meldungen am S23 Ultra empfangen; Zielgerät beim Nachbau lokal eintragen |
| Aufgeräumtes Dashboard | Testfelder erscheinen nur bei eingeschaltetem Testmodus |
| Virtuelle Kontakte | Implementiert; echte Eingänge werden im Testmodus ignoriert |
| Chipnummer-Abgleich | Software und Simulation vorhanden; echter RFID-Leser fehlt |
| Akkuwarnung und Messwerte | INA3221-Spannung und Ladeerkennung mit USB bestätigt; Akkubetrieb und Laufzeitkalibrierung noch zu prüfen |
| Akkubetrieb | Am Prototyp bestätigt; Laufzeit noch nicht gemessen |
| Deep Sleep | Noch nicht implementiert |
| Antenne, Leser-Treiber und 3D-Druck | Geplant; noch nicht enthalten |

## Sprache im Dashboard

Das optionale automatische Dashboard folgt der Home-Assistant-Profilsprache: Deutsch zeigt deutsche Beschriftungen und Ergebnisse; andere Sprachen verwenden Englisch. Die Einrichtung steht in [LOCALIZATION.md](LOCALIZATION.md). Für die bestehende deutsche Firmware sind `entity_prefix: katzenklappe` und `legacy: true` vorgesehen; erneutes Flashen ist dafür nicht nötig. Namen in der Geräteverwaltung und in Detaildialogen bleiben wie registriert.

Handy-Meldungen haben in jeder Automation eine eigene Variable `notification_language: en` oder `de`. Sie laufen auf dem Server und kennen kein gerade geöffnetes Benutzerprofil.

## Dateien

Der aktuelle main-Branch zeigt einzelne Öffnungsmeldungen mit Ereigniszeit und bereitet die Akkuanzeige vor. USB-/Akku-Stromquelle und erste INA3221-Lademesswerte werden angezeigt; die Restlaufzeit bleibt bis zur Kalibrierung unbekannt. Die vollständige Zusatzteileliste und Verdrahtung stehen in [POWER-MONITORING.de.md](POWER-MONITORING.de.md); der veröffentlichte Tag beta.3 enthält diese späteren Änderungen noch nicht.

- `usb-detection.yaml`: USB-/Akkubetrieb separat erkennen, auch ohne INA219.
- `power-monitoring-ina3221.yaml`: optionale Akkumessung an Kanal 1 des angeschlossenen INA3221; siehe [Einrichtung und Platinenprüfung](INA3221.de.md).
- `power-monitoring.yaml`: optionale INA219-/USB-Messung; zuerst die Hardware einbauen. [Verdrahtung und Kalibrierung](POWER-MONITORING.de.md).
- `cat-flap.yaml`: vollständiges ESPHome-Beispiel. Nur diese Datei als Geräte-Konfiguration verwenden.
- `secrets.example.yaml`: Vorlage für lokale Zugangsdaten.
- `dashboard-auto.yaml`, `frontend/smart-cat-flap-card.js`: automatische Sprache nach HA-Profil.
- `dashboard.yaml`, `dashboard.de.yaml`: feste englische/deutsche Beschriftungen.
- `LOCALIZATION.md`: Einrichtung und Unterstützung der vorhandenen deutschen Firmware.
- `homeassistant-automation.yaml`: Öffnungsmeldungen auf das Handy.
- `battery-notifications.yaml`: Akkuwarnungen und Entwarnungen; echte und simulierte Ereignisse getrennt.
- `movement.yaml`, `extensions.yaml`: Referenzbausteine der vollständigen Konfiguration. Nicht zusätzlich zu `cat-flap.yaml` einfügen.
- `TESTING.md`: Tests ohne neue Hardware und Grenzen der Beta.
- `CHANGELOG.md`: Versionsübersicht.

Code und Dateinamen sind auf Englisch. Das Dashboard unterstützt Deutsch und Englisch; die Sprache der Meldungen ist separat einstellbar.

## Installation

1. ESPHome 2026.9.1 verwenden. Die Beispiele benötigen Home Assistant mit Unterstützung für ESPHome-Events, Textentitäten und die aktuelle Automationssyntax.
2. `cat-flap.yaml` in das ESPHome-Konfigurationsverzeichnis kopieren. Beim Einfügen in eine vorhandene Geräte-Konfiguration den bestehenden Gerätenamen sowie WLAN-, API- und OTA-Einstellungen erhalten. Ein geänderter Gerätename kann die Zuordnung in Home Assistant ändern.
3. `secrets.example.yaml` als **lokale** `secrets.yaml` speichern und alle Platzhalter ersetzen. Einen gültigen ESPHome-API-Schlüssel erzeugen; das Beispiel enthält absichtlich keinen nutzbaren Schlüssel.
4. Konfiguration mit ESPHome validieren, kompilieren und erstmals per USB installieren. Das Beispiel aktiviert API-Verschlüsselung und verschlüsselte ESPHome-OTA-Updates. Die installierte Firmware und ESPHome müssen diese OTA-Funktion unterstützen.
5. Gerät über die ESPHome-Integration in Home Assistant hinzufügen.
6. Die beiden Automationsdateien jeweils im YAML-Editor einer neuen Automation einfügen. **`notify.mobile_app_your_phone` durch die tatsächliche Benachrichtigungsaktion ersetzen.** Entitätsnamen mit der eigenen Installation abgleichen.
7. Unter Einstellungen → Dashboards ein leeres Dashboard erstellen. Im Raw-Konfigurationseditor `dashboard.yaml` einfügen. Dieser Inhalt ersetzt das ausgewählte Dashboard; deshalb ein eigenes leeres Dashboard verwenden.
8. Bearbeitungsmodus verlassen und den Testmodus-Schalter ausprobieren. Im Bearbeitungsmodus zeigt Home Assistant bedingte Karten auch ohne erfüllte Bedingung an.

Das Dashboard erwartet Entitäten mit dem Präfix `smart_cat_flap_`. Bei einem anderen Gerätenamen oder bereits vorhandenen gleichnamigen Entitäten müssen die IDs angepasst werden. Die allgemeine Geräteverwaltung listet weiterhin alle Entitäten; die bedingte Anzeige gilt für das Dashboard.

<details>
<summary>Migration von beta.1</summary>

Die englischen Beispiele verwenden den Gerätenamen `smart-cat-flap`, den Anzeigenamen `Smart Cat Flap` und das Entitätspräfix `smart_cat_flap_`. Die Öffnungsereignisse heißen `inside`, `outside`, `unclear`; Akkuereignisse `low` und `recovered`. Firmware, Dashboard und beide Automationen gemeinsam umstellen. Bereits registrierte Home-Assistant-Entitäten können ihre alten IDs behalten; die tatsächlichen IDs prüfen und bei Bedarf anpassen. Die laufende deutsche Installation wurde durch die Veröffentlichung nicht verändert. Die ursprüngliche Version ist weiterhin als beta.1 verfügbar.

</details>

## Anschluss der Reedkontakte

| Kontakt | XIAO ESP32-C6 |
|---|---|
| Innen: potentialfreier Schließerkontakt | Zwischen **D0 / GPIO0** und **GND** |
| Außen: potentialfreier Schließerkontakt | Zwischen **D1 / GPIO1** und **GND** |

Interne Pull-ups sind aktiviert. Ein geschlossener Kontakt gegen GND wird als aktiv ausgewertet. Bei Kontakten mit COM/NO/NC die Schließerkombination durch Durchgangsmessung bestimmen. Keine Versorgungsspannung an diese Kontakte anlegen. Die Bezeichnung D0 ist ein Board-Pinname; die Firmware verwendet GPIO0.

Ein Magnet bewegt sich mit der Klappe. In Mittelstellung sollen beide Kontakte inaktiv sein. Bei Bewegung nach innen soll zuerst der Innenkontakt, nach außen zuerst der Außenkontakt schalten. Vorhandene Verschlussmagnete können die Kontakte beeinflussen; die Positionen müssen am echten Aufbau geprüft werden.

## Auswertung und Grenzen

Der erste Kontakt bestimmt die Richtung. Werden beide innerhalb von 100 ms erkannt, lautet das Ergebnis `unclear`. Ein Ereignis wird erst nach 500 ms mit beiden Kontakten inaktiv erneut zugelassen. Auch nach Neustart und Umschalten des Testmodus wird diese Ruhezeit abgewartet.

Rückschwingen wird dadurch meist unterdrückt. Zwei schnelle tatsächliche Öffnungen können zusammengefasst werden; spätes Nachschwingen kann erneut gezählt werden. Die Zähler beginnen nach jedem ESP-Neustart bei null. Während eines Verbindungsausfalls verlorene Ereignisse werden nicht nachgeliefert.

Die zwei Richtungskontakte liefern keinen zuverlässigen dauerhaft offenen/geschlossenen Zustand. Es gibt keinen Verriegelungsantrieb und keine Zutrittskontrolle. Die Chip-Auswertung liefert nur das letzte Leseergebnis und ist noch nicht mit einer Öffnung verknüpft.

## Akkuanzeige und spätere RFID-Erweiterung

Der geschützte 3,7-V-/2000-mAh-Akku ist am Prototyp angeschlossen; die Verbindung zu Home Assistant funktioniert auch ohne USB. Laden erfolgt über die integrierte Ladeschaltung des XIAO. Der Akkuanschluss allein liefert der Software jedoch keine Messwerte. Die angeschlossene [INA3221-/USB-Messschaltung](INA3221.de.md) liefert Akkuspannung und Ladestrom. Entlademessung, Stabilität im Akkubetrieb und die manuell kalibrierte Restlaufzeit müssen noch geprüft werden. Die vorhandenen BAT-Lötstellen müssen dafür nicht erneut erhitzt werden. Die Firmware enthält keinen Tiefentladeschutz; Dauer-WLAN und Akkulaufzeit sind noch nicht optimiert.

Für implantierte Tierchips ist ein zum tatsächlichen Chip passender Leser erforderlich. FDX-B mit 134,2 kHz ist die bisherige Planungsannahme. Eine passive Antennenspule allein an GPIOs ersetzt kein Lesemodul. Leser, Antennenabstimmung, Pegel und Protokoll sind noch festzulegen; es ist kein erfundener UART-Treiber enthalten.

## Dokumentation

- [Seeed XIAO ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/)
- [ESPHome GPIO-Sensoren](https://esphome.io/components/binary_sensor/gpio/)
- [ESPHome OTA](https://esphome.io/components/ota/esphome/)
- [Home Assistant: bedingte Karten](https://www.home-assistant.io/dashboards/conditional/)

Fehler und Erfahrungen mit der mechanischen Montage können über GitHub Issues gemeldet werden.
