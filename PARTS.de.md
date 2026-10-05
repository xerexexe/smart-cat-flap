# Teileliste

[English](PARTS.md) | **Deutsch**

## Werbung / Affiliate-Hinweis

Die folgenden Amazon-Links sind Affiliate-Links. Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Ein Kauf über diese Links kann das Projekt unterstützen. Gleichwertige Teile können auch anderswo gekauft werden.

## Mindestbedarf für die Öffnungserkennung

| Menge | Teil | Zweck und Auswahlhinweise | Amazon.de |
|---|---|---|---|
| 1, falls noch nicht eingebaut | NAMSAN Fliegengitter-Katzenklappe, S, Schwarz | Die im Projekt verwendete Klappe. Maße laut Angebot: Außenrahmen 25 × 31,5 cm, innere Öffnung 21 × 24,5 cm. Eine vorhandene passende Klappe weiterverwenden. | [NAMSAN S, Schwarz — Affiliate-Link](https://www.amazon.de/dp/B0BVF4BRD7?th=1&linkCode=ll2&tag=xerexexe-21&linkId=c1c59964c58e61a4e0c86007af9d7788&ref_=as_li_ss_tl) |
| 1 | Seeed Studio XIAO ESP32-C6 | Führt ESPHome aus und verbindet sich mit Home Assistant. Für dieses Projekt das C6-Modell verwenden. | [XIAO ESP32-C6 — Affiliate-Link](https://www.amazon.de/dp/B0D2NKVB34?th=1&linkCode=ll2&tag=xerexexe-21&linkId=bba6cd061ce635df290c3ba6b551c2d3&ref_=as_li_ss_tl) |
| 2 Kontakte | Kabelgebundene Reedkontakte mit Magneten | Erfassen die Schwenkrichtung. Das verlinkte Gebildet-Set Schwarz E1183 enthält zwei Kontaktsätze mit Wechslerkontakten und Magneten. | [Zwei Kontaktsätze — Affiliate-Link](https://www.amazon.de/dp/B0C9KQRSV2?th=1&linkCode=ll2&tag=xerexexe-21&linkId=62cf6252d4e119858257c1d33c1658ba&ref_=as_li_ss_tl) |
| 1, für Akkubetrieb | Geschützter einzelliger 3,7-V-LiPo, etwa 2000 mAh | EEMB LP103454RP ist ein Kandidat mit PCM-Schutz laut Angebot. Der XIAO hat Akku-Lötpads; der JST-Stecker ist **nicht direkt einsteckbar**. | [EEMB 2000 mAh — Affiliate-Link](https://www.amazon.de/EEMB-2000mAh-Lithium-Polymer-JST2-0-Stecker/dp/B0B7N2T1TD?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dib=eyJ2IjoiMSJ9.s48hNAQtAlYEKRBmSWyoHtwE2_HX-mXzuSPtnJsvPippCB_4mRP4Uyc1vY7ZU9PSvfrPhaORm0hjLViwGwS2ufVargGViwdkArg4i8D1LB8QkYHK1viXctzPGViMrFRFI1PNSI2k-f5di9N5rGRO11lpZtK2IcSIsIVYaKkUH19tAakU66jILQIM2tHZScXxKtdDD0BplKYqhgv98qJXbeFqcl4bQwnax6T_pYm5SvPLdPfA8yFmrDpSLl_qL7j-E2-dl9rXU0rWOO8ykp1YSYLI_Nr6mkGEcIiQBknlR4s.9_X7atOe-wkeNcazDFP21F6t3qluQRc8cv_RL0rVy04&dib_tag=se&keywords=LiPo%2B3.7V%2B2000mAh%2BSchutzschaltung&qid=1791102150&s=ce-de&sr=1-7&th=1&linkCode=ll2&tag=xerexexe-21&linkId=d8fc50939a33134f84f84cfd6710724c&ref_=as_li_ss_tl) |

Das sind Einkaufsbeispiele, kein vollständig erprobter Aufbau. Die XIAO-Plattform wird bereits zur Entwicklung verwendet; die Montage der verlinkten Sensoren und der Akkuaufbau sind noch nicht praktisch getestet. Die Akkulaufzeit wurde nicht gemessen. Für Softwaretests genügt der ESP mit USB-Stromversorgung.

## Hinweise zum Aufbau

- Der Reedkontakt muss bei entferntem Magneten offen sein und bei angenähertem Magneten schließen. Bei Alarmkontakten können sich NO/NC-Bezeichnungen auf den Türzustand beziehen: die passende Aderkombination durch Durchgangsmessung bestimmen, statt nur nach Farbe oder Beschriftung anzuschließen. Einen Kontakt zwischen D0/GPIO0 und GND, den anderen zwischen D1/GPIO1 und GND anschließen. Die ungenutzte Wechslerader isolieren.
- In Ruhestellung sollen beide Kontakte inaktiv sein. Schaltabstand, Rückschwingen und vorhandene Verschlussmagnete beim Einbau prüfen. Das verlinkte Kontaktgehäuse misst laut Angebot ungefähr 29 × 15 × 9 mm.
- Beim Akku 4,2-V-Ladeschlussspannung, Polung und zulässigen Ladestrom mit Akku- und [XIAO-Dokumentation](https://wiki.seeedstudio.com/xiao_esp32c6_getting_started/) abgleichen. Platz außen am Rahmen vorsehen; das Angebot nennt ungefähr 34,5 × 56 × 10,3 mm. Dauerhaftes WLAN und die aktuelle Firmware sind noch nicht für lange Akkulaufzeit optimiert. Die echte Akkuspannungsmessung ist noch nicht angeschlossen.
- Kabel, Isolierung und gedruckte Halter gehören zum Aufbau. Ein Steckbrett, Jumper-Set oder allgemeines Bauteilsortiment ist für diese Liste nicht erforderlich. Gehäuse und Halter sind als 3D-Druck geplant; Druckdateien sind noch nicht enthalten.

## Zusatzteile für die echte Akkuanzeige

Benötigt werden **ein INA219-Modul mit R100-Shunt (0,1 Ω)**, **ein 68-kΩ-Widerstand mit 1 %** und **ein 100-kΩ-Widerstand mit 1 %**. Ein weiteres Lademodul oder Steckbrett wird nicht benötigt. Das Messmodul kommt in die rote Akkuleitung, ohne erneut an BAT zu löten. [Verdrahtung und Firmware](POWER-MONITORING.de.md). Der praktische Test steht noch aus.


Ein dokumentierter Kandidat ist [Soldered 333066 bei Amazon](https://www.amazon.de/dp/B0FY6LGK9G) (normaler Produktlink), mit 0,1-Ω-Shunt und 38 × 22 mm Platinenmaß laut [Hersteller](https://docs.soldered.com/ina219/overview/). VIN+/VIN− können als IN+/IN− beschriftet sein. Zusätzlich Platz für Klemmen und Kabel vorsehen.

## Spätere Erweiterung

RFID-Leser, Antenne und Hardware zum Stromsparen sind zurückgestellt. Für Leser und Antenne gibt es noch keinen erprobten Aufbau zum Nachkaufen. Eine Antennenspule allein kann keinen implantierten Tierchip auslesen. Diese Erweiterungen erhalten eine eigene Teileliste, sobald Schnittstellen und elektrische Anforderungen feststehen.

Die Angebotsangaben wurden am 04.10.2026 angesehen. Preise, Verkäufer, Lieferbarkeit und Varianten können sich ändern; vor dem Bestellen die gewählte Variante prüfen. Hier werden keine Preise oder Produktbilder übernommen.
