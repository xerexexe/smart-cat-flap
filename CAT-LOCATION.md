# Estimated cat location / Geschätzter Aufenthaltsort

The full dashboard and compact overview share `input_text.smart_cat_flap_cat_location` (Text helper, max 255 characters, restored by HA). Install `cat-location-automation.yaml` separately with your device/payload entity IDs. It processes real, timestamped journal records without changing notification or acknowledgement handling. Missing/test/invalid records are ignored; an unclear direction sets location to unknown. Older records and duplicates cannot replace a newer correction.

Use **Correct location → Inside / Outside / Unknown** on either card. A manual correction persists until a newer real opening. The correction timestamp uses the browser clock; keep phone/PC and ESP clocks synchronized. Both cards can override `location_entity` when using multiple flaps. Updates synchronize through HA, including other browsers.

This estimates one cat's location from flap movement; it is not RFID-confirmed presence. A photo does not identify the animal. The last measured opening direction remains unchanged. Without history the display starts **Unknown**; it never guesses from connectivity.

## Deutsch

Beide Ansichten teilen den Text-Helfer `input_text.smart_cat_flap_cat_location` (maximal 255 Zeichen). Die separate Automation `cat-location-automation.yaml` mit passenden Geräte-/Entitätsnamen installieren. Der Helfer ist auch in `reliable-opening-helper.yaml` enthalten: nicht doppelt anlegen.

Unter **Aufenthalt korrigieren** kannst du **Drinnen**, **Draußen** oder **Unbekannt** setzen. Die Angabe bleibt bis zur nächsten neueren echten Klappenbewegung erhalten. Testmeldungen und ältere gepufferte Ereignisse überschreiben sie nicht. Eine unklare Bewegung setzt den Aufenthalt auf unbekannt. Die Uhrzeit einer manuellen Korrektur stammt vom Browser; Handy/PC und ESP müssen die richtige Zeit haben.

Die Grafik verschiebt die Katze auf die passende Seite der Klappe; unbekannter Aufenthalt erscheint blass in der Mitte. Die Quelle **Manuell gesetzt** oder **Aus Öffnung abgeleitet** bleibt sichtbar. Die gemessene letzte Öffnungsrichtung wird nicht umgeschrieben. Es ist eine Schätzung für eine Katze, keine durch den Tierchip bestätigte Anwesenheit.
