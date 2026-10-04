# Katzenklappe smart 🐈

**Beta · v0.1.0-beta.1**

Eine vorhandene Katzenklappe im Fliegengitter mit einem **Seeed Studio XIAO ESP32-C6**, ESPHome und Home Assistant erweitern. Zwei Reedkontakte erfassen die Schwenkrichtung. Home Assistant meldet Öffnungen auf dem Handy. Ein Testmodus ermöglicht Softwaretests, bevor Sensoren, Akku und Tierchip-Leser vorhanden sind.

Diese Beta wurde mit ESPHome **2026.9.1** auf einem echten XIAO ESP32-C6 getestet. Mechanische Tests an der eingebauten Klappe stehen noch aus. Die Schwenkrichtung ist kein Nachweis, dass eine Katze vollständig hinein- oder hinausgelaufen ist.

## Funktionen und Stand

| Funktion | Beta-Stand |
|---|---|
| Zwei Kontakte an GPIO0/GPIO1 | Implementiert; mechanische Montage noch zu testen |
| Öffnungsrichtung innen, außen oder unklar | Implementiert; 50 ms Entprellung und 5 s Ruhezeit |
| Handy-Benachrichtigungen | HA-Automationen; Zielgerät lokal eintragen |
| Aufgeräumtes Dashboard | Testfelder erscheinen nur bei eingeschaltetem Testmodus |
| Virtuelle Kontakte | Implementiert; echte Eingänge werden im Testmodus ignoriert |
| Chipnummer-Abgleich | Software und Simulation vorhanden; echter RFID-Leser fehlt |
| Akkuwarnung | Software und Simulation vorhanden; echte Spannungsmessung fehlt |
| Akkubetrieb mit Deep Sleep | Noch nicht implementiert; Entwicklung per USB |
| Antenne, Leser-Treiber und 3D-Druck | Geplant; noch nicht enthalten |

## Dateien

- `katzenklappe.yaml`: vollständiges ESPHome-Beispiel. Nur diese Datei als Geräte-Konfiguration verwenden.
- `secrets.example.yaml`: Vorlage für lokale Zugangsdaten.
- `dashboard.yaml`: vollständige Konfiguration für ein eigenes HA-Dashboard.
- `homeassistant-automation.yaml`: Öffnungsmeldungen auf das Handy.
- `akku-benachrichtigung.yaml`: Akkuwarnungen und Entwarnungen; echte und simulierte Ereignisse getrennt.
- `bewegung.yaml`, `erweiterungen.yaml`: Referenzbausteine der vollständigen Konfiguration. Nicht zusätzlich zu `katzenklappe.yaml` einfügen.
- `TESTEN.md`: Tests ohne neue Hardware und Grenzen der Beta.
- `CHANGELOG.md`: Versionsübersicht.

## Installation

1. ESPHome 2026.9.1 verwenden. Die Beispiele benötigen Home Assistant mit Unterstützung für ESPHome-Events, Textentitäten und die aktuelle Automationssyntax.
2. `katzenklappe.yaml` in das ESPHome-Konfigurationsverzeichnis kopieren. Beim Einfügen in eine vorhandene Geräte-Konfiguration den bestehenden Gerätenamen sowie WLAN-, API- und OTA-Einstellungen erhalten. Ein geänderter Gerätename kann die Zuordnung in Home Assistant ändern.
3. `secrets.example.yaml` als **lokale** `secrets.yaml` speichern und alle Platzhalter ersetzen. Einen gültigen ESPHome-API-Schlüssel erzeugen; das Beispiel enthält absichtlich keinen nutzbaren Schlüssel.
4. Konfiguration mit ESPHome validieren, kompilieren und erstmals per USB installieren. Das Beispiel aktiviert API-Verschlüsselung und verschlüsselte ESPHome-OTA-Updates. Die installierte Firmware und ESPHome müssen diese OTA-Funktion unterstützen.
5. Gerät über die ESPHome-Integration in Home Assistant hinzufügen.
6. Die beiden Automationsdateien jeweils im YAML-Editor einer neuen Automation einfügen. **`notify.mobile_app_dein_handy` durch die tatsächliche Benachrichtigungsaktion ersetzen.** Entitätsnamen mit der eigenen Installation abgleichen.
7. Unter Einstellungen → Dashboards ein leeres Dashboard erstellen. Im Raw-Konfigurationseditor `dashboard.yaml` einfügen. Dieser Inhalt ersetzt das ausgewählte Dashboard; deshalb ein eigenes leeres Dashboard verwenden.
8. Bearbeitungsmodus verlassen und den Testmodus-Schalter ausprobieren. Im Bearbeitungsmodus zeigt Home Assistant bedingte Karten auch ohne erfüllte Bedingung an.

Das Dashboard erwartet Entitäten mit dem Präfix `katzenklappe_`. Bei einem anderen Gerätenamen oder bereits vorhandenen gleichnamigen Entitäten müssen die IDs angepasst werden. Die allgemeine Geräteverwaltung listet weiterhin alle Entitäten; die bedingte Anzeige gilt für das Dashboard.

## Anschluss der Reedkontakte

| Kontakt | XIAO ESP32-C6 |
|---|---|
| Innen: potentialfreier Schließerkontakt | Zwischen **D0 / GPIO0** und **GND** |
| Außen: potentialfreier Schließerkontakt | Zwischen **D1 / GPIO1** und **GND** |

Interne Pull-ups sind aktiviert. Ein geschlossener Kontakt gegen GND wird als aktiv ausgewertet. Bei Kontakten mit COM/NO/NC die Schließerkombination durch Durchgangsmessung bestimmen. Keine Versorgungsspannung an diese Kontakte anlegen. Die Bezeichnung D0 ist ein Board-Pinname; die Firmware verwendet GPIO0.

Ein Magnet bewegt sich mit der Klappe. In Mittelstellung sollen beide Kontakte inaktiv sein. Bei Bewegung nach innen soll zuerst der Innenkontakt, nach außen zuerst der Außenkontakt schalten. Vorhandene Verschlussmagnete können die Kontakte beeinflussen; die Positionen müssen am echten Aufbau geprüft werden.

## Auswertung und Grenzen

Der erste Kontakt bestimmt die Richtung. Werden beide innerhalb von 100 ms erkannt, lautet das Ergebnis `unklar`. Ein Ereignis wird erst nach fünf Sekunden mit beiden Kontakten inaktiv erneut zugelassen. Auch nach Neustart und Umschalten des Testmodus wird diese Ruhezeit abgewartet.

Rückschwingen wird dadurch meist unterdrückt. Zwei schnelle tatsächliche Öffnungen können zusammengefasst werden; spätes Nachschwingen kann erneut gezählt werden. Die Zähler beginnen nach jedem ESP-Neustart bei null. Während eines Verbindungsausfalls verlorene Ereignisse werden nicht nachgeliefert.

Die zwei Richtungskontakte liefern keinen zuverlässigen dauerhaft offenen/geschlossenen Zustand. Es gibt keinen Verriegelungsantrieb und keine Zutrittskontrolle. Die Chip-Auswertung liefert nur das letzte Leseergebnis und ist noch nicht mit einer Öffnung verknüpft.

## Akku und RFID später

Ein passender geschützter einzelliger Lithiumakku mit 3,7 V Nennspannung und 4,2 V Ladeschlussspannung kann beim originalen XIAO ESP32-C6 über die integrierte Ladeschaltung geladen werden. Polung und Anschluss nach Board-Dokumentation prüfen. Die Firmware enthält aktuell **keinen angeschlossenen ADC-Messpfad und keinen Tiefentladeschutz**. Eine echte Akkuwarnung benötigt die noch zu ergänzende Messschaltung. Dauerhaftes WLAN ist kein sparsamer Langzeitbetrieb.

Für implantierte Tierchips ist ein zum tatsächlichen Chip passender Leser erforderlich. FDX-B mit 134,2 kHz ist die bisherige Planungsannahme. Eine passive Antennenspule allein an GPIOs ersetzt kein Lesemodul. Leser, Antennenabstimmung, Pegel und Protokoll sind noch festzulegen; es ist kein erfundener UART-Treiber enthalten.

## Dokumentation

- [Seeed XIAO ESP32-C6](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/)
- [ESPHome GPIO-Sensoren](https://esphome.io/components/binary_sensor/gpio/)
- [ESPHome OTA](https://esphome.io/components/ota/esphome/)
- [Home Assistant: bedingte Karten](https://www.home-assistant.io/dashboards/conditional/)

Fehler und Erfahrungen mit der mechanischen Montage können über GitHub Issues gemeldet werden.
