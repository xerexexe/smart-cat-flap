# Das Foto deiner Katze

Ein optionales Bild wird gemeinsam im Dashboard und in den zuverlässigen Öffnungsbenachrichtigungen verwendet. Dafür ist kein Firmware-Update nötig.

1. Aktualisiere die Dashboard-Ressource wie in [LOCALIZATION.md](LOCALIZATION.md) beschrieben.
2. Lege einen Text-Helfer `Smart Cat Flap cat photo` mit der Entitäts-ID `input_text.smart_cat_flap_cat_photo` und maximal 255 Zeichen an. Alternativ ist er in `reliable-opening-helper.yaml` enthalten. Nicht doppelt anlegen.
3. Wähle im Dashboard unter **Deine Katze → Foto auswählen** ein Bild aus der Handy-Bildauswahl oder dem Dateidialog am PC. Es wird automatisch auf maximal 1600 Pixel verkleinert, als JPEG ohne ursprüngliche Metadaten in Home Assistant hochgeladen und übernommen. Eingabedateien bis 25 MB; das Bildformat muss vom Browser lesbar sein (JPEG/PNG empfohlen). Hochladen benötigt einen Home-Assistant-Administrator und lokale Medien.
4. Alternativ unter **Foto hinterlegen oder ändern** einen vorhandenen Pfad wie `/media/local/katze.jpg`, eine HTTPS-Bildadresse oder `/local/katze.jpg` eintragen und **Foto übernehmen** wählen. Ein leeres Feld stellt die Illustration wieder her.
5. Aktualisiere die vorhandene Öffnungsautomation anhand von `reliable-opening-automation.yaml`. Behalte dabei dein Handy als Ziel und die Variablen deiner Installation bei. `cat_photo_entity` verweist auf denselben Helfer. Nur das optionale Benachrichtigungsbild kommt hinzu; Bestätigung und Erkennung doppelter Meldungen bleiben erhalten. Bei einem anderen Helfer die Einstellung in Karte und Automation ändern.

Medien verwenden authentifizierten Zugriff; das Dashboard lädt sie mit einer kurzzeitig signierten Bildadresse. Dateien unter `/local/` sind ohne Anmeldung erreichbar. Das Handy muss Home Assistant erreichen können, um lokale Bilder auch unterwegs zu laden.

Ohne Bild bleiben Meldungen reine Textmeldungen. Prüfe nach dem Hinterlegen die nächste echte Öffnungsbenachrichtigung. Das Foto dient der Darstellung, nicht der Erkennung einer Katze.

Quelle: [Home Assistant Companion – Benachrichtigungsanhänge](https://companion.home-assistant.io/docs/notifications/notification-attachments/).
