# Beta testen

## Bisher geprüft

- Firmware mit ESPHome 2026.9.1 auf einem echten XIAO ESP32-C6 kompiliert und installiert.
- Virtuelle Öffnungen nach innen, außen sowie gleichzeitige Signale mit Ergebnis unklar.
- Getrennte Ereignisse und Zähler für echte Eingänge und Simulationen.
- Kein weiteres Ereignis bei gehaltenem Testkontakt; Rückschwingen innerhalb der Sperrzeit unterdrückt.
- Software-Abgleich eigener und fremder Chipnummern, ungültige Nummer sowie fehlende eingelernte Nummer.
- Akku-Simulation mit Hysterese: 3,40 V niedrig; wiederholter Wert ohne erneute Warnung; 3,60 V weiterhin niedrig; 3,80 V Entwarnung.
- HA-Automationen für Öffnung und Akku: Benachrichtigungsaktion ohne Fehler ausgeführt.
- Dashboard am 04.10.2026 mit dem echten ESP geprüft: Testmodus an blendet alle drei Testgruppen ein; aus blendet sie aus. Endzustand aus. Beim Sichtbarkeitstest wurden keine simulierten Öffnungen oder Akkuwarnungen ausgelöst.

Die Programmtests ersetzen keine Tests mit montierten Reedkontakten, realer Katze, RFID-Leser oder Akku.

## Öffnung simulieren

1. Dashboard öffnen, Testmodus einschalten, fünf Sekunden auf Erkennung bereit warten.
2. Testkontakt innen einschalten: eine Testöffnung nach innen. Echter Zähler bleibt unverändert.
3. Innen ausschalten und außen einschalten: Rückschwingen innerhalb der Sperrzeit erzeugt keine zweite Meldung.
4. Beide ausschalten, fünf ruhige Sekunden abwarten, dann außen einschalten: eine Testöffnung nach außen.
5. Gehaltene Kontakte erzeugen keine Wiederholungen. Für den Fall unklar beide Schalter mit einer gemeinsamen HA-Aktion einschalten; zwei manuelle Klicks sind für 100 ms nicht zuverlässig schnell genug.
6. Testmodus ausschalten: virtuelle Kontakte werden zurückgesetzt, Testbereich verschwindet, nach Ruhezeit werden echte Kontakte ausgewertet.

Für einen Eingangstest im Normalmodus GPIO0 bzw. GPIO1 mit GND verbinden. Nur die vorgesehenen Signalpins gegen GND brücken, keine Versorgungspins. Zwischen den Versuchen beide Eingänge fünf Sekunden frei lassen.

## Chip-Auswertung simulieren

Nur erfundene Testnummern verwenden, beispielsweise `123456789012345`.

1. Testmodus einschalten. Erlaubte Chipnummer und simulierte Chipnummer auf dieselbe Testnummer setzen.
2. Chiplesung simulieren: Ergebnis eigene Katze.
3. Andere 15-stellige Nummer: fremder Chip. `abc`: ungültige Chipnummer.
4. Erlaubte Chipnummer leeren, gültige Testnummer simulieren: keine Katze eingelernt.
5. Nach dem Test die gespeicherte Chipnummer auf den gewünschten Wert zurücksetzen oder leeren. Dieses Feld ist die echte, dauerhaft gespeicherte Konfiguration.

Leerzeichen und Bindestriche werden entfernt, führende Nullen erhalten. Andere Zeichen oder eine Länge ungleich 15 sind ungültig. Chipnummern werden nicht ins Firmware-Log geschrieben. Ohne Hardware bleibt die echte RFID-Zuordnung unbekannt.

## Akkuwarnung simulieren

1. Testmodus einschalten. Simulierte Akkuspannung auf 3,40 V setzen und Testspannung prüfen drücken.
2. Erneut prüfen: kein zusätzliches Warnereignis.
3. 3,60 V prüfen: weiterhin niedrig.
4. 3,80 V prüfen: ausreichend und ein Entwarnungsereignis.
5. Testmodus ausschalten. Testknöpfe sind außerhalb dieses Modus wirkungslos.

Das Zahlenfeld allein führt keine Prüfung aus. Schwellen sind vorläufig: niedrig bei höchstens 3,50 V, Entwarnung ab 3,65 V. Die Spannung ist keine Prozentanzeige. Werte außerhalb 2,5–4,3 V werden verworfen. Warnzustände starten nach einem ESP-Neustart neu.

Testzustände bleiben nach Ausschalten gespeichert, werden im Dashboard aber verborgen. Echte Akkuwerte bleiben unbekannt, bis die reale Messschaltung angeschlossen und ihre Verarbeitung ergänzt ist.

## Noch offen

Mechanische Positionierung und Nachschwingen, kurze Kontaktimpulse, Durchgänge mit der Katze, reale Chiplesung samt zeitlicher Zuordnung, ADC-Kalibrierung, Akkulaufzeit, Deep Sleep mit sicherem Erfassen des ersten Kontakts sowie Verhalten bei WLAN-Ausfällen.
