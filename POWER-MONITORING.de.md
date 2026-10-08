# Akku- und USB-Messung

> **INA3221-Prototyp:** Für das angeschlossene schwarze Modul gibt es `power-monitoring-ina3221.yaml`. Dafür die [INA3221-Anleitung](INA3221.de.md) verwenden, nicht die INA219-Anschlussbelegung unten. Die Händlerbilder widersprechen sich; die INA3221-Anleitung dokumentiert die tatsächliche Verdrahtung und die bestätigten Lademesswerte.

[English](POWER-MONITORING.md) | **Deutsch**

Diese optionale Erweiterung misst Akkuspannung und den Strom in der Akkuleitung.
Ein weiterer Eingang erkennt USB-Stromversorgung. Die Hardware ist noch nicht
eingebaut oder praktisch getestet. Die vorhandene Firmware läuft ohne diese Erweiterung weiter.

Softwareprüfung am 05.10.2026: Englisches Beispiel mit Erweiterung erfolgreich
für ESP32-C6 unter ESPHome 2026.9.1 kompiliert; deutsche ID-Zuordnung mit ESPHome
validiert. Elektrische Messwerte sind damit noch nicht praktisch geprüft.

## USB-Erkennung schon ohne INA219

Die USB-Erkennung kann separat mit `usb-detection.yaml` aktiviert werden:

```yaml
packages:
  usb_detection: !include usb-detection.yaml
```

Verdrahtung: **5V → 8,2 kΩ → gemeinsamer Punkt an D3 → 12 kΩ → GND**.
Die ursprünglichen 68 kΩ / 100 kΩ funktionieren ebenfalls. Beide Varianten
benötigen keinen anderen Programmcode. Am Prototyp wurden am D3-Punkt 3,09 V
mit USB und 0 V ohne USB gemessen. Das erkennt die Versorgung, noch keinen Ladestrom.
Beim späteren Wechsel zur kompletten Messung beide Paketdateien kopieren und
nur `power-monitoring.yaml` einbinden; dieses enthält die USB-Erkennung bereits.

## Genau diese Zusatzteile

| Menge | Teil | Zweck |
|---|---|---|
| 1 | INA219-Modul mit 0,1-Ω-Shunt (Aufdruck R100), VIN+/VIN−, VCC, GND, SDA, SCL | Akkuspannung und Strom beim Laden und Entladen |
| 1 | 68-kΩ-Widerstand, 1 %, mindestens 0,125 W | Oberer Widerstand zur USB-Erkennung |
| 1 | 100-kΩ-Widerstand, 1 %, mindestens 0,125 W | Unterer Widerstand zur USB-Erkennung |

Kabel und Schrumpfschlauch sind bereits vorhanden. Ein Steckbrett oder ein weiteres
Lademodul ist nicht nötig: Geladen wird weiterhin über USB-C am XIAO.
Das INA219-Modul mit seiner Halterung muss zusätzlich im Gehäuse Platz finden.
Die Werte gelten für ein übliches R100-Modul; andere Shunts benötigen eine angepasste Konfiguration.

## Verdrahtung ohne erneutes Löten an BAT

USB abziehen. Nur die **rote Akkuleitung** an einer zugänglichen Stelle unterbrechen,
die freien Enden einzeln isolieren. Schwarz bleibt angeschlossen. Während der Arbeit
ist der Akku durch die unterbrochene rote Leitung vom ESP getrennt; der Akku selbst
bleibt elektrisch aktiv. Erst nach fertiger, isolierter Verdrahtung wieder verbinden.

```text
Akku rot (+) ── VIN+ [INA219 / R100] VIN− ── vorhandene rote Leitung zu BAT+
Akku schwarz (−) ────────────────────────── vorhandene Leitung zu BAT−
```

| Anschluss am INA219 | Anschluss am XIAO |
|---|---|
| VCC | 3V3 |
| GND | GND |
| SDA | D4 / GPIO22 |
| SCL | D5 / GPIO23 |

VIN+ und VIN− sind Stromanschlüsse, nicht die Versorgung des Moduls.
Mit dieser Richtung bedeutet positiver Strom Entladen, negativer Strom Laden.
Die BAT-Lötpads werden nicht erneut erwärmt. Die äußeren 3V3/GND/D4/D5-Anschlüsse
des XIAO werden für die zusätzlichen Leitungen verwendet.

USB-Erkennung an den äußeren 5V-, GND- und D3-Anschlüssen:

```text
XIAO 5V ── 68 kΩ ──┬── D3 / GPIO21
                    └── 100 kΩ ── GND
```

Vor dem Anschluss an D3 die Spannung am Verbindungspunkt gegen GND messen:
bei etwa 5 V USB ungefähr 3,0 V; ohne USB ungefähr 0 V. **5 V niemals direkt
an D3 anschließen.** D0 und D1 bleiben für die Reedkontakte, D6/D7 für einen
späteren seriellen RFID-Leser frei.

## Firmware aktivieren – erst nach Einbau

`power-monitoring.yaml` und `usb-detection.yaml` neben die Geräte-YAML kopieren. Beim englischen Beispiel:

```yaml
packages:
  power_monitor: !include power-monitoring.yaml
```

Für die bestehende deutsche Firmware dieses Projekts:

```yaml
packages:
  power_monitor: !include
    file: power-monitoring.yaml
    vars:
      pm_battery_script: akku_verarbeiten
      pm_voltage_id: akkuspannung_echt
      pm_warning_id: akkuwarnung_echt
```

Einen bereits vorhandenen `packages:`-Abschnitt ergänzen, keinen zweiten anlegen.
Gerätename, WLAN und Verschlüsselung beibehalten. Vor Installation validieren und
kompilieren. Die Adresse des Moduls muss 0x40 sein.

## Was die Anzeigen bedeuten

- **Akkuspannung:** gemessene Spannung auf der Akkuseite; verwendet die bestehende
  Akkuwarnung (niedrig bei ≤3,5 V, Erholung bei ≥3,65 V).
- **Stromversorgung:** USB angeschlossen oder Akkubetrieb.
- **Ladestatus:** „Lädt“ bei USB und mehr als 5 mA Strom in den Akku;
  „Wird entladen“ bei mehr als 5 mA aus dem Akku; sonst „Lädt nicht“.
  USB allein beweist keinen Ladevorgang. „Lädt nicht“ beweist keinen vollen Akku.
- **Restzeit:** grobe Schätzung in Stunden. Sie ist keine zugesicherte Laufzeit.
  Kurze WLAN-Stromspitzen, Alterung, Temperatur und die tatsächlich nutzbare
  Kapazität können das Ergebnis deutlich verändern.

Für die Restzeit den Akku zuerst vollständig über USB laden. Wenn die rote
Lade-LED aus ist, in den Geräteeinstellungen **Confirm full battery** betätigen.
Die Bestätigung wird nur mit frischen Messungen, USB, ≥4,10 V und höchstens
10 mA Strombetrag angenommen. Unter **Usable battery capacity** stehen zunächst
2000 mAh; das ist die Nennkapazität, kein gemessener Wert.
Nach Abziehen von USB erscheint die Schätzung frühestens nach einer Minute
Entladung. Mit USB verwendet die Anzeige den zuletzt gelernten Verbrauch im
Akkubetrieb; der USB-Strom ersetzt diesen Mittelwert nicht. Kalibrierung,
Restladung und gelernter Verbrauch bleiben nach Neustarts erhalten. Nach einer
Kapazitätsänderung oder einer Messlücke über 20 Sekunden ist eine neue
Voll-Bestätigung erforderlich. Nach längerem stromlosen Lagern erneut voll
bestätigen, da Selbstentladung nicht gemessen wird. Beim ersten Wechsel von der
alten Firmware mit flüchtiger Kalibrierung ist einmal neu voll zu bestätigen. Fehlende Messungen werden nach spätestens etwa 25 Sekunden
unbekannt statt als aktuelle Werte angezeigt.

## Erster Funktionstest

1. Akkuspannung mit dem Multimeter vergleichen; Strom sollte ohne USB positiv sein.
2. USB anstecken: Quelle muss USB werden. Bei einem nicht vollen Akku sollte der
   Strom negativ und der Ladestatus „Lädt“ werden.
3. USB abziehen: Quelle muss Akku werden, Strom wieder positiv.
4. Voll-Bestätigung und Schätzung nach einer Minute Entladung prüfen.
5. Bei einem Sensorfehler müssen Spannung, Warnung, Ladestatus und Restzeit unbekannt
   werden. Die Öffnungserkennung muss weiterlaufen.

Grundlagen: [Seeed – Akku und USB](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/#battery-usage),
[ESPHome – INA219](https://esphome.io/components/sensor/ina219/).
