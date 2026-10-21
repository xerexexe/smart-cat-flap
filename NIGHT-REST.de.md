# Optionale Nachtruhe

[English](NIGHT-REST.md)

Die Nachtruhe gehört zu `battery-saving.yaml`. `night-rest.yaml` und `night-schedule.h` daneben kopieren. USB-Erkennung, zuverlässige Zustellung und Uhrzeit werden vorausgesetzt. Die aktualisierte Dashboardkarte zeigt die Einstellungen bei `reliable_delivery: true`; gegebenenfalls die Kartenressource neu laden.

Die eigene Karte **Nachtruhe** zeigt den 24-Stunden-Zeitplan: Gold steht für Erkennung, Violett für geplante Ruhe. Die Markierung zeigt die aktuelle Uhrzeit. Über **Ruhe ab** und **Wieder aktiv ab** lassen sich volle Stunden auswählen; der Schalter oben aktiviert den Plan. Ausgeschaltet bleibt die Grafik eine beschriftete Vorschau. USB/Testmodus und fehlende Verbindung werden gesondert erklärt. Weitere Hinweise stehen unter **Was passiert während der Nachtruhe?**.

Aktuelle Kartenressource: `/local/smart-cat-flap-card.js?v=20261018-night-graphic2`. Bei einer anderen Firmware-Zeitzone auch `night_timezone` in der Dashboardkarten-Konfiguration passend setzen. Während einer Funkpause zeigt die Karte zuletzt gemeldete Einstellungen; Änderungen bleiben bis zur Verbindung gesperrt. Die Grafik stellt den Zeitplan dar und behauptet keinen tatsächlich bestätigten Tiefschlaf.

- **Nachtruhe** ist anfangs aus und merkt sich die Auswahl. Voreinstellung **22 bis 6 Uhr**, Endstunde ausgeschlossen. Gleiche Stunden deaktivieren das Fenster; ein Zeitfenster tagsüber funktioniert ebenfalls.
- Zeitzone **Europe/Berlin**, mit Sommer-/Winterzeit; über `saving_timezone` anpassbar. Ohne gültige Uhrzeit bleibt der ESP wach.
- Tiefschlaf mit Timer: keine Erkennung, RFID-Verarbeitung, neuen Puffereinträge, Benachrichtigungen oder regelmäßigen Berichte. Öffnungen nachts werden bewusst nicht aufgezeichnet oder nachgeliefert. Die Klappe bleibt mechanisch benutzbar.
- Vorher bleiben 60 Sekunden für Zustellung/Wartung. Aktive Kontakte oder laufende Richtungserkennung verzögern den Schlaf. Bereits gepufferte Ereignisse bleiben auch ohne HA im Flash; ein Speicherfehler verhindert den Schlaf. Nach dem Aufwachen geht die Zustellung weiter.
- Bereits **vor dem Einschlafen** erkanntes USB oder Testmodus verhindern die Nachtruhe. Sie funktioniert unabhängig vom Tagesstromsparschalter. Nach Timerstart wird der zuvor aktive Tagesstromsparmodus wieder aktiviert.
- Im Tiefschlaf kein WLAN/Fernzugriff. **USB allein weckt ihn nicht.** Für vorzeitige Wartung USB anstecken und Reset drücken. Nach Reset bleiben mindestens 60 Sekunden zum Eingreifen. Uhrdrift und WLAN-Verbindungsaufbau können die Morgenmeldung verzögern.
- Tiefschlaf startet den ESP neu: Zähler „seit Neustart“ werden zurückgesetzt. Ereignispuffer und gespeicherte Kalibrierung/Einstellungen bleiben erhalten.

Software-Schlaf ist keine vollständige Stromtrennung: INA3221, LEDs und weitere versorgte Elektronik bleiben an. Der zukünftige RFID-Leser braucht separat geprüfte Standby-Steuerung. Für die ESP-Nachtruhe sind keine neuen Bauteile nötig. Die Ersparnis ist ungemessen. Die Stromintegration erfasst die Nachtlücke nicht; Restladung/-laufzeit können deshalb zu optimistisch sein.

## Praktischer Test

Prototyp am 18.10.2026: Mit gesicherter installierter Konfiguration gebaut und erfolgreich verschlüsselt per WLAN übertragen. API-Prüfung bestätigte Nachtruhe AUS, Start 22 und Ende 6. Der vorher aktive Tagesstromsparmodus wurde wieder eingeschaltet. Die aktualisierte HA-Karte zeigt alle drei Bedienelemente. Nächtlicher Tiefschlaf/Timerstart sind noch nicht praktisch getestet.

Mit USB Nachtruhe einschalten und Erreichbarkeit prüfen. Für einen kurzen Akkutest Startstunde auf die aktuelle und Endstunde auf die nächste lokale Stunde stellen. USB abziehen, Kontakte inaktiv lassen; Schlaf nach Vorbereitungsfenster, Timerstart, normale Öffnungsmeldungen und Zustellung vorhandener Puffereinträge prüfen. Danach wieder 22 / 6 einstellen. Zum Abbrechen USB anstecken und Reset drücken. Konfigurations-/Buildprüfungen ersetzen diesen Hardwaretest nicht; ein erfolgreicher Aufwachtest wird hier nicht behauptet.

Quellen: [ESPHome-Tiefschlaf](https://esphome.io/components/deep_sleep/), [ESP32-C6-Schlafmodi](https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-reference/system/sleep_modes.html).
