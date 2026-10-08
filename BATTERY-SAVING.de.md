# Stromsparen und gepufferte Öffnungen (experimentell)

Diese optionale Erweiterung schaltet WLAN zwischen Meldungen ab und nutzt kurze Light-Sleep-Phasen. Voreinstellung: **5 Minuten**. Ein Kontakt weckt das Gerät und startet sofort einen Verbindungsversuch. Wann die Benachrichtigung ankommt, hängt weiterhin von WLAN, Home Assistant und dem Push-Dienst ab. Die tatsächliche Akkulaufzeit mit diesem Modus ist noch nicht gemessen.

## Einrichten

`event-journal.h`, `reliable-delivery.yaml` und `battery-saving.yaml` neben die Geräte-YAML kopieren. Voraussetzung sind die vorhandene USB-Erkennung an GPIO21 und die aktiven LOW-Kontakte an GPIO0/1. Falls der Device Builder die Paket-YAMLs als eigene Geräte anzeigt, einen Unterordner verwenden und die Include-Pfade anpassen. Header und Zustellungspaket müssen im selben Ordner liegen.

In den vorhandenen `packages:`-Abschnitt aufnehmen; keinen zweiten Abschnitt anlegen:

```yaml
packages:
  delivery: !include reliable-delivery.yaml
  saving: !include battery-saving.yaml
```

In Home Assistant einen Text-Helfer mit der ID `input_text.smart_cat_flap_last_delivered_opening` und Maximallänge 40 erstellen. Alternativ `reliable-opening-helper.yaml` als Home-Assistant-Paket laden. Die bisherige Öffnungsbenachrichtigung durch `reliable-opening-automation.yaml` **ersetzen**, damit nicht beide senden. Gerätename, Payload-Sensor, Bestätigungsaktion und Handy-Aktion an die vorhandenen IDs anpassen. Die Akku-Automation bleibt erhalten. Der ESP benötigt keine zusätzliche Freigabe zum Ausführen von Home-Assistant-Aktionen.

Für den bisherigen deutschen Prototyp gelten folgende Substitutionen:

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

In seiner Automation: `device_name: katzenklappe-smart`, `notification_language: de`, `sensor.katzenklappe_pending_opening_payload` und `esphome.katzenklappe_smart_acknowledge_opening`. Tatsächliche IDs kontrollieren; die Entitätsregistrierung kann andere Namen behalten.

## Verhalten

- **Experimental battery saving** ist nach jedem Neustart AUS. Erst nach Prüfung der echten Kontakte einschalten.
- **Reporting interval** erlaubt 1 bis 60 Minuten und wird gespeichert.
- Meldezyklus und Stromintegration verwenden eine Uhr, die auch die Schlafzeit mitzählt. Grundlage ist die [Timer-Dokumentation von Espressif](https://docs.espressif.com/projects/esp-idf/en/stable/esp32c6/api-reference/system/esp_timer.html).
- Mit USB, eingeschaltetem Testmodus oder aktivem Kontakt bleibt WLAN an. USB einstecken weckt das Gerät für Updates.
- Nach der Anmeldung von Home Assistant bleiben 10 Sekunden zur Übertragung der Zustände, damit eine langsame Wiederverbindung nicht sofort die Übertragung abschneidet. Nach insgesamt spätestens 60 Sekunden wird der Verbindungs-/Zustellversuch beendet. Der nächste Versuch folgt nach dem Meldeintervall. Gemessen wird ab WLAN-Abschaltung, also liegen die Meldungen ungefähr Intervall plus Verbindungsfenster auseinander.
- Light Sleep behält die laufende Erkennung und deren RAM-Zustand. Kurze Schlafphasen von 50 ms lassen ESPHome-Timer und INA-Messungen weiterlaufen. Wie viel Strom das konkret spart, muss am Aufbau geprüft werden.
- Kontakte und USB-Erkennung werden abgefragt, weil GPIO-Aufwachen die Interrupt-Konfiguration verändert. Sehr kurze Impulse können übersehen werden; Magnetposition prüfen und beim Test den Kontakt mindestens 100 ms aktiv halten.
- INA3221 und seine LEDs bleiben versorgt. Für diese Erweiterung sind keine zusätzlichen Bauteile erforderlich.

## Puffer und Grenzen

Der FIFO-Puffer hält bis zu **256 Öffnungen** mit Richtung, Testkennzeichen, Gerätezeit und eindeutiger Ereignisnummer. Neue Einträge werden vor der Zustellung in Flash geschrieben. Nur die Bestätigung des ältesten Eintrags entfernt ihn; eine alte Bestätigung kann keine neuere Öffnung löschen. Bei bestehender Verbindung wird alle 10 Sekunden über den nativen API-Textsensor erneut versucht zuzustellen.

Home Assistant sendet die Meldung, speichert die Nummer im Helfer und bestätigt danach. Wiederholungen derselben Nummer werden ohne neue Meldung bestätigt. Eine feste Android-Benachrichtigungskennung begrenzt doppelte sichtbare Meldungen, falls HA zwischen Senden und Speichern abstürzt. Das ist Zustellung **mindestens einmal**, keine Garantie für exakt einmal. Die Bestätigung bedeutet, dass HA den Benachrichtigungsaufruf angenommen hat; sie bestätigt nicht den Empfang oder das Lesen am Handy. Die Automation nicht ohne Zustandsauslöser manuell starten.

Ein voller Puffer verwirft weitere Öffnungen und zählt sie unter **Opening buffer overflows**. **Opening storage error** meldet Flash-Schreibfehler; RAM-Einträge sind dann bis zur erfolgreichen Speicherung nicht gegen Stromausfall geschützt. Flash verträgt nur eine begrenzte Zahl Schreibvorgänge. Keine dauernde Test-Ereignisschleife verwenden. Flash-Löschen oder Änderungen am Speicherformat können gespeicherte Einträge entfernen.

War die Geräteuhr nicht synchronisiert, bleibt der Zeitwert null und die Meldung nennt den ursprünglichen Zeitpunkt als nicht verfügbar. Empfangszeit wird nicht als Öffnungszeit ausgegeben. Die bisherigen Ereignisentitäten bleiben für den Online-Verlauf erhalten; die Benachrichtigung nutzt den Puffer. Bisherige Öffnungszähler beginnen nach Neustarts weiterhin bei null.

## Test und Restlaufzeit

Gesamtkonfiguration vor dem Aufspielen prüfen und kompilieren. Innen, außen, beide Kontakte, vorübergehend deaktivierte Benachrichtigungsautomation, Wiederholungen und Puffererhalt nach Neustart testen. Danach Stromsparmodus einschalten, USB abziehen, Kontakt-Aufwachen und regelmäßige Meldung prüfen und den Stromverbrauch vergleichen. Bei fehlgeschlagenem Aufwachtest den Modus ausgeschaltet lassen.

Am Prototyp geprüft am 07.10.2026: ESPHome-2026.9.1-Build und Pufferprüfungen erfolgreich; Innen-Testöffnung durch HA bestätigt. Eine Außenöffnung überstand einen OTA-Neustart mit derselben Nummer und ursprünglichen Uhrzeit und wurde anschließend zugestellt. Dashboard-Sprachtests erfolgreich. Eine echte Kontaktöffnung im Akkubetrieb lieferte eine Handy-Meldung und eine vollständig abgeschlossene HA-Bestätigung. Am 08.10.2026 verband sich das unberührte Gerät im Akkubetrieb nach der Zeitkorrektur nach fünf Minuten erneut, übertrug frische Akku-, Versorgungs-, Strom- und Pufferwerte an HA und schaltete WLAN wieder ab. Der tatsächliche Verbrauch ist noch nicht gemessen. Sensoranzeigen behalten den zuletzt übertragenen Wert bis zur nächsten Meldung und können bei abgeschaltetem WLAN als nicht verfügbar erscheinen.

Die vorhandene Restlaufzeit integriert Strom-Messwerte und benötigt nach einem Neustart wieder die bestätigte volle Batterie. Der Mittelwert berücksichtigt auch kleine und stromlose Entlade-Messwerte; bei durchschnittlich höchstens 0,5 mA bleibt die Restlaufzeit unbekannt. Seltene INA-Messungen können kurze WLAN-Stromspitzen übersehen; die Laufzeit bleibt eine Schätzung. Frühere Rechenbeispiele mit angenommenen Strömen sind keine Messwerte dieser Umsetzung.
