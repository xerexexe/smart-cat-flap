# Optional outgoing API connection

ESPHome 2026.10 introduces `api.outgoing_connection`. Home Assistant 2026.10 or later can accept the encrypted connection opened by the device. The prototype was upgraded to stable ESPHome 2026.10.0 on 21 October 2026 and its outgoing connection was verified. The current `cat-flap.yaml` already enables this option. The separate package below is for existing configurations; it is not compatible with ESPHome 2026.9.1.

After selecting a compatible builder, include:

```yaml
packages:
  outgoing_api: !include api-outgoing.yaml
```

Keep the existing `api.encryption.key`. With no `host` configured the device learns the address from a compatible Home Assistant connection and remembers it across reboots. It must first connect to HA normally. Both directions use the same existing encryption key. The HA listener defaults to TCP 6054; normal incoming API and OTA remain available.

The five-second delay fits the short daytime reporting window. Devices configured with deep sleep may attempt a callback immediately on wake. This does not change reporting intervals, overnight rest, event buffering or acknowledgement logic. It is another way to establish the connection, not a guarantee of lower latency or longer battery life.

Before deployment: back up the actual installed YAML and current firmware, compile with the selected version and validate existing custom sleep/journal code. After OTA: verify firmware version, encrypted HA connection, states and an actual outgoing callback in the device log. A normal incoming API connection alone does not prove the new path. Restore the user's daytime-saving setting after reboot. Keep nightly settings and full-battery calibration unchanged.

## Deutsch

Die Datei `api-outgoing.yaml` benötigt ESPHome und Home Assistant **2026.10**. Der Prototyp wurde am 21.10. auf die stabile Version **2026.10.0** aktualisiert und die ausgehende Verbindung geprüft. Die aktuelle `cat-flap.yaml` aktiviert die Option bereits. Das separate Paket ist für bestehende Konfigurationen gedacht und funktioniert nicht mit ESPHome 2026.9.1.

Nach Auswahl einer passenden Version kann der ESP die verschlüsselte Verbindung selbst aufbauen. Der vorhandene Schlüssel bleibt bestehen. Home Assistant muss das Gerät bereits kennen; ohne festen `host` lernt der ESP die Zieladresse bei einer normalen HA-Verbindung. Tagsüber ist eine kurze Wartezeit von fünf Sekunden vorgesehen. Nachtpause und Ereignispuffer bleiben unverändert.

Eine erfolgreiche normale HA-Verbindung bestätigt allein noch nicht, dass auch der ausgehende Verbindungsweg funktioniert; dafür den tatsächlichen Callback im Geräteprotokoll prüfen.

Source: [ESPHome native API / outgoing connections](https://esphome.io/components/api/#outgoing-connections).
