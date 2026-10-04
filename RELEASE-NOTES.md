# Katzenklappe smart v0.1.0-beta.1

Erste öffentliche **Beta / Vorabversion** für Seeed Studio XIAO ESP32-C6 mit ESPHome und Home Assistant.

Enthalten sind die Erkennung der Klappenrichtung mit zwei Kontakten, Handy-Benachrichtigungen und ein Dashboard, das Kontakt-, Chip- und Akkutests nur bei eingeschaltetem Testmodus anzeigt.

Die Firmware wurde mit ESPHome 2026.9.1 auf einem echten XIAO ESP32-C6 getestet. Chip-Abgleich und Akkuwarnung sind bislang Software-Simulationen: echter RFID-Leser, Antenne, Akkumessung und Deep Sleep folgen später. Mechanische Tests stehen aus. Eine Öffnungsrichtung bestätigt keinen vollständigen Katzendurchgang.

Zum Einrichten README.md und TESTEN.md lesen. Zugangsdaten lokal in secrets.yaml eintragen und die Benachrichtigungsaktion auf das eigene Handy anpassen.

Es wird bewusst keine vorkompilierte Firmware mit gerätespezifischen WLAN- oder API-Zugangsdaten angeboten. Der Quellcode ist über die GitHub-Archive dieser Version verfügbar.
