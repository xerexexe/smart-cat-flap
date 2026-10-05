# Dashboard language

## Automatic profile language

The optional `frontend/smart-cat-flap-card.js` uses Home Assistant's frontend/profile language. German (`de`, including regional variants) displays German labels and results; other languages use English. Its default is `language: auto`. It does not change your profile language, entity registry, firmware, API credentials or underlying states.

The card wraps Home Assistant's native cards and controls. It translates custom direction, RFID and battery result text locally, including legacy German firmware states. Conditions still use raw entity states, so translating unknown/unavailable does not accidentally reveal unfinished hardware or test controls. No external JavaScript dependencies or network calls are used.

### Installation

1. Copy `frontend/smart-cat-flap-card.js` to `<HA config>/www/smart-cat-flap-card.js`. Create the `www` folder if necessary.
2. Under Settings → Dashboards → Resources, add `/local/smart-cat-flap-card.js?v=0.1.0-beta.3` as a **JavaScript module**. Advanced mode may be required to see Resources.
3. Create a dedicated empty dashboard and paste `dashboard-auto.yaml` into its raw configuration editor. Keep the static dashboard as a fallback if desired.
4. Reload the browser. For updates, replace the file and change the version query in the resource URL to avoid cached code.
5. Exit dashboard edit mode. Test controls appear only when Test mode is on.

Example card configuration:

```yaml
type: custom:smart-cat-flap-card
language: auto
entity_prefix: smart_cat_flap
```

For an existing beta.1 German installation, without reflashing the ESP:

```yaml
type: custom:smart-cat-flap-card
language: auto
entity_prefix: katzenklappe
legacy: true
```

Set `language: de` or `language: en` to override automatic selection. `entity_prefix` changes the prefix only; for other custom entity IDs, adapt the source mappings. The built-in dashboard navigation title and entity names in device settings are user-defined configuration and are not dynamically translated by this card. The automatic dashboard uses a neutral cat icon for its view title.

## Templates without a custom card

- `dashboard.yaml`: fixed English labels.
- `dashboard.de.yaml`: fixed German labels with the **same English firmware entity IDs**. This file alone does not translate text states supplied by the firmware.

These static templates need no additional resource. They do not automatically follow the profile language.

## Phone notifications

The automatic card shows battery monitoring rows even before the measurement
hardware is installed. Missing measurements remain Unknown. See
[POWER-MONITORING.md](POWER-MONITORING.md) for the optional entity contract and
the hardware still needed; the display does not estimate charge or runtime
from connectivity.

Each automation has a separate variable:

```yaml
variables:
  notification_language: en
```

Change it to `de` for German notifications. Other values fall back to English. Change the setting in both opening and battery automations. The notification target remains `notify.mobile_app_your_phone` until replaced locally.

Notifications run on the server, without a current browser/profile language. They therefore do not automatically follow a viewer's dashboard language. The existing German installation can keep its existing German notifications; the automatic dashboard does not replace those automations.

## Verification

Run `node --test tests/localization.test.mjs` (Node.js 20 or newer). Tests cover profile selection, regional/fallback languages, both firmware state vocabularies, legacy entity mappings, and unchanged conditions/control targets across languages.

Changing profile language changes the card labels and displayed text states. Built-in controls follow Home Assistant's own translations. Detailed entity dialogs show the underlying entity's original name and state.

References: [custom cards](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/), [frontend data](https://developers.home-assistant.io/docs/frontend/data/), [frontend language](https://www.home-assistant.io/integrations/frontend/).
