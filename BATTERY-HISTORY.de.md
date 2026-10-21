# Lokale Akkuhistorie

[English](BATTERY-HISTORY.md)

Die optionale Home-Assistant-Integration speichert Messberichte in einer eigenen lokalen SQLite-Datei: `<HA config>/cat_flap_battery_history.sqlite`. Die Aufbewahrung des normalen HA-Verlaufs bleibt unverändert. Die Datei enthält Zeitpunkte und Gerätedaten und gehört in die Datensicherung.

Zur Installation den Ordner `home_assistant/custom_components/cat_flap_battery_history/` nach `<HA config>/custom_components/` kopieren. INA3221-Firmware und Stromsparpaket gemeinsam aktualisieren. Die folgende Plattform in die vorhandene `sensor:`-Liste der `configuration.yaml` einfügen; keinen zweiten gleichnamigen Abschnitt anlegen:

```yaml
sensor:
  - platform: cat_flap_battery_history
    entity_prefix: katzenklappe
    telemetry_entity: sensor.katzenklappe_battery_history_report
```

Für englische Neuinstallationen beide Präfixe durch `smart_cat_flap` ersetzen. Home Assistant nach der Erstinstallation neu starten. Dashboard-Datei und Ressourcen-Version ebenfalls aktualisieren, siehe [Sprachanzeige](LOCALIZATION.md).

Die Auswertung lernt fortlaufend aus den jeweils letzten **30 Tagen**. Die erste Prognose erscheint nach 30 Tagen und mindestens sieben tatsächlich gemessenen Tagen im Akkubetrieb innerhalb dieses Zeitraums. Vorher steht im Dashboard der Lernfortschritt. Der alte, kurzfristig schwankende Laufzeitwert entfällt.

Der Tagesverbrauch ergibt sich aus der verbrauchten Ladung geteilt durch die tatsächlich gemessene Akkuzeit, auf 24 Stunden umgerechnet. Tages- und Wochenwerte gruppieren dieselben Daten und werden nicht doppelt addiert. Daraus und aus der verbleibenden geschätzten Ladung entsteht die Laufzeit. USB-Zeiten fließen nicht als besonders sparsamer Akkubetrieb ein; die Prognose kann auch an USB weiterhin den möglichen Akkubetrieb beschreiben.

Der ESP übermittelt fortlaufende Verbrauchszähler, Messdauer, USB-Dauer, Neustartkennung und Laufzeit. Damit sind Messungen aus Funkpausen enthalten. Neustarts, zurückgesetzte Zähler und Messlücken werden als Lücken behandelt. Nach mehr als 15 Minuten ohne Bericht wird keine neue Laufzeit angezeigt. Die vorhandene Akku-Kalibrierung bleibt davon getrennt erhalten.

**Im nächtlichen Tiefschlaf wird der Verbrauch nicht gemessen.** INA3221 und seine LEDs bleiben versorgt. Bei mehr als 5% ungemessener Zeit und mindestens fünf Minuten erhält eine fertige Prognose den Hinweis „Teilweise Messung · Nachtlücken“. Sie beschreibt die gemessenen Betriebszeiten und kann die echte Laufzeit überschätzen. Auch sehr kleine Ströme und kurze WLAN-Spitzen sind durch die Messhardware begrenzt.

Unter „Strom & Gerät“ erscheinen Lernmodell, Tagesverbrauch, gemessene Akkuzeit und ungemessene Zeit. Die Modell-Entität enthält Tageswerte und Kalenderwochen für das aktuelle 30-Tage-Fenster. Intervalle über Mitternacht werden zeitanteilig zugeordnet; Sommer-/Winterzeit wird berücksichtigt. Ältere Rohdaten bleiben vollständig in der Datenbank und erlauben eine spätere Rekonstruktion. Es gibt keine automatische Löschung; die Datei wächst mit der Zeit.

Zusätzlich werden Spannung, Strom, Ladestand, Kapazität, Versorgungsquelle, Schätzqualität und relevante Geräteeinstellungen protokolliert. Diese Angaben dienen der Diagnose und werden nicht einfach über ungemessene Zeiträume fortgeschrieben. Nach Stromausfall verlorene Flash-Zwischenstände werden als Lücke erkannt. Die Integration steuert weder das Laden noch eine automatische Neukalibrierung.
