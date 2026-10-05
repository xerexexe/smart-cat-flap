// Smart Cat Flap: local-only dashboard translations using Home Assistant's profile language.
// No external dependencies or network requests. Firmware/entity registry names are not changed.
const TEMPLATE = [
  {
    "type": "entities",
    "title": "Smart Cat Flap",
    "show_header_toggle": false,
    "entities": [
      {
        "entity": "binary_sensor.smart_cat_flap_connection",
        "name": "Connection"
      },
      {
        "entity": "binary_sensor.smart_cat_flap_detection_ready",
        "name": "Detection ready"
      },
      {
        "entity": "sensor.smart_cat_flap_last_opening_direction",
        "name": "Last opening direction"
      },
      {
        "entity": "sensor.smart_cat_flap_openings_since_restart",
        "name": "Openings since restart"
      },
      {
        "entity": "switch.smart_cat_flap_test_mode",
        "name": "Test mode"
      }
    ]
  },
  {
    "type": "conditional",
    "conditions": [
      {
        "condition": "state",
        "entity": "sensor.smart_cat_flap_battery_voltage",
        "state_not": [
          "unknown",
          "unavailable"
        ]
      }
    ],
    "card": {
      "type": "entities",
      "title": "Battery",
      "show_header_toggle": false,
      "entities": [
        {
          "entity": "sensor.smart_cat_flap_battery_voltage",
          "name": "Battery voltage"
        },
        {
          "entity": "binary_sensor.smart_cat_flap_battery_low",
          "name": "Battery low"
        }
      ]
    }
  },
  {
    "type": "conditional",
    "conditions": [
      {
        "condition": "state",
        "entity": "sensor.smart_cat_flap_rfid_match",
        "state_not": [
          "unknown",
          "unavailable"
        ]
      }
    ],
    "card": {
      "type": "entities",
      "title": "Cat identification",
      "show_header_toggle": false,
      "entities": [
        {
          "entity": "sensor.smart_cat_flap_rfid_match",
          "name": "Last reader result"
        },
        {
          "entity": "text.smart_cat_flap_allowed_chip_id",
          "name": "Your cat chip ID"
        }
      ]
    }
  },
  {
    "type": "conditional",
    "conditions": [
      {
        "condition": "state",
        "entity": "switch.smart_cat_flap_test_mode",
        "state": "on"
      }
    ],
    "card": {
      "type": "vertical-stack",
      "cards": [
        {
          "type": "markdown",
          "content": "**Test mode active** · Contacts are simulated. Physical contacts are ignored in this mode. Test notifications are marked TEST on the configured phone."
        },
        {
          "type": "entities",
          "title": "Test opening",
          "show_header_toggle": false,
          "entities": [
            {
              "entity": "switch.smart_cat_flap_test_inside_contact",
              "name": "Test inside contact"
            },
            {
              "entity": "switch.smart_cat_flap_test_outside_contact",
              "name": "Test outside contact"
            },
            {
              "entity": "sensor.smart_cat_flap_last_test_direction",
              "name": "Last test direction"
            },
            {
              "entity": "sensor.smart_cat_flap_test_openings_since_restart",
              "name": "Test openings since restart"
            },
            {
              "entity": "event.smart_cat_flap_test_opening",
              "name": "Last test event"
            },
            {
              "type": "section",
              "label": "Physical contacts for wiring checks"
            },
            {
              "entity": "binary_sensor.smart_cat_flap_inside_contact",
              "name": "Inside contact"
            },
            {
              "entity": "binary_sensor.smart_cat_flap_outside_contact",
              "name": "Outside contact"
            }
          ]
        },
        {
          "type": "entities",
          "title": "Test cat chip",
          "show_header_toggle": false,
          "entities": [
            {
              "entity": "text.smart_cat_flap_allowed_chip_id",
              "name": "Your cat chip ID (saved)"
            },
            {
              "entity": "text.smart_cat_flap_test_chip_id",
              "name": "Simulated chip ID"
            },
            {
              "entity": "button.smart_cat_flap_test_read_chip",
              "name": "Simulate chip reading"
            },
            {
              "entity": "sensor.smart_cat_flap_rfid_test_status",
              "name": "Test result"
            }
          ]
        },
        {
          "type": "entities",
          "title": "Test battery warning",
          "show_header_toggle": false,
          "entities": [
            {
              "entity": "number.smart_cat_flap_test_battery_voltage",
              "name": "Simulated battery voltage"
            },
            {
              "entity": "button.smart_cat_flap_test_check_battery",
              "name": "Check test voltage"
            },
            {
              "entity": "sensor.smart_cat_flap_battery_test_reading",
              "name": "Last test reading"
            },
            {
              "entity": "sensor.smart_cat_flap_battery_test_status",
              "name": "Test result"
            },
            {
              "entity": "binary_sensor.smart_cat_flap_battery_test_warning",
              "name": "Test warning"
            },
            {
              "entity": "event.smart_cat_flap_battery_test_event",
              "name": "Last test event"
            }
          ]
        }
      ]
    }
  }
];
const GERMAN = {
  "Smart Cat Flap": "Katzenklappe",
  "Connection": "Verbindung",
  "Detection ready": "Erkennung bereit",
  "Last opening direction": "Letzte Öffnungsrichtung",
  "Openings since restart": "Öffnungen seit Neustart",
  "Test mode": "Testmodus",
  "Battery": "Akku",
  "Battery voltage": "Akkuspannung",
  "Battery low": "Akku niedrig",
  "Cat identification": "Katzenerkennung",
  "Last reader result": "Letztes Leseergebnis",
  "Your cat chip ID": "Chipnummer deiner Katze",
  "Test opening": "Öffnung testen",
  "Test inside contact": "Testkontakt innen",
  "Test outside contact": "Testkontakt außen",
  "Last test direction": "Letzte Testrichtung",
  "Test openings since restart": "Testöffnungen seit Neustart",
  "Last test event": "Letztes Testereignis",
  "Physical contacts for wiring checks": "Echte Kontakte zur Anschlussprüfung",
  "Inside contact": "Kontakt innen",
  "Outside contact": "Kontakt außen",
  "Test cat chip": "Katzenchip testen",
  "Your cat chip ID (saved)": "Chipnummer deiner Katze (gespeichert)",
  "Simulated chip ID": "Simulierte Chipnummer",
  "Simulate chip reading": "Chiplesung simulieren",
  "Test result": "Testergebnis",
  "Test battery warning": "Akkuwarnung testen",
  "Simulated battery voltage": "Simulierte Akkuspannung",
  "Check test voltage": "Testspannung prüfen",
  "Last test reading": "Letzter Testmesswert",
  "Test warning": "Testwarnung",
  "**Test mode active** · Contacts are simulated. Physical contacts are ignored in this mode. Test notifications are marked TEST on the configured phone.": "**Testmodus aktiv** · Die Kontakte werden simuliert. Echte Kontakte werden in diesem Modus ignoriert. Testmeldungen gehen als TEST an das konfigurierte Handy."
};
const LEGACY = {
  "connection": "verbindung",
  "detection_ready": "erkennung_bereit",
  "last_opening_direction": "letzte_oeffnungsrichtung",
  "openings_since_restart": "oeffnungen_seit_neustart",
  "test_mode": "testmodus",
  "battery_voltage": "akkuspannung",
  "battery_low": "akku_niedrig",
  "rfid_match": "rfid_zuordnung",
  "allowed_chip_id": "erlaubte_chipnummer",
  "test_inside_contact": "testkontakt_innen",
  "test_outside_contact": "testkontakt_aussen",
  "last_test_direction": "letzte_testrichtung",
  "test_openings_since_restart": "testoeffnungen_seit_neustart",
  "test_opening": "testoeffnung",
  "inside_contact": "kontakt_innen",
  "outside_contact": "kontakt_aussen",
  "test_chip_id": "test_chipnummer",
  "test_read_chip": "test_chip_lesen",
  "rfid_test_status": "rfid_teststatus",
  "test_battery_voltage": "test_akkuspannung",
  "test_check_battery": "test_akku_pruefen",
  "battery_test_reading": "akku_testmesswert",
  "battery_test_status": "akku_teststatus",
  "battery_test_warning": "akku_testwarnung",
  "battery_test_event": "akku_testereignis"
};
const STATES = {
  "battery": ["Battery", "Akku"],
  "usb": ["USB", "USB"],
  "charging": ["Charging", "Lädt"],
  "not_charging": ["Not charging", "Lädt nicht"],
  "discharging": ["Discharging", "Wird entladen"],
  "full": ["Full", "Voll"],
  "on": ["Yes", "Ja"],
  "off": ["No", "Nein"],
  "inside": [
    "Inside",
    "Innen"
  ],
  "innen": [
    "Inside",
    "Innen"
  ],
  "outside": [
    "Outside",
    "Außen"
  ],
  "aussen": [
    "Outside",
    "Außen"
  ],
  "unclear": [
    "Unclear",
    "Unklar"
  ],
  "unklar": [
    "Unclear",
    "Unklar"
  ],
  "low": [
    "Low",
    "Niedrig"
  ],
  "niedrig": [
    "Low",
    "Niedrig"
  ],
  "recovered": [
    "Recovered",
    "Erholt"
  ],
  "erholt": [
    "Recovered",
    "Erholt"
  ],
  "invalid chip ID": [
    "Invalid chip ID",
    "Ungültige Chipnummer"
  ],
  "ungueltige Chipnummer": [
    "Invalid chip ID",
    "Ungültige Chipnummer"
  ],
  "no cat enrolled": [
    "No cat enrolled",
    "Keine Katze eingelernt"
  ],
  "keine Katze eingelernt": [
    "No cat enrolled",
    "Keine Katze eingelernt"
  ],
  "own cat": [
    "Own cat",
    "Eigene Katze"
  ],
  "eigene Katze": [
    "Own cat",
    "Eigene Katze"
  ],
  "unknown chip": [
    "Unknown chip",
    "Fremder Chip"
  ],
  "fremder Chip": [
    "Unknown chip",
    "Fremder Chip"
  ],
  "invalid reading": [
    "Invalid reading",
    "Ungültiger Messwert"
  ],
  "ungueltiger Messwert": [
    "Invalid reading",
    "Ungültiger Messwert"
  ],
  "Battery low": [
    "Battery low",
    "Akku niedrig"
  ],
  "Akku niedrig": [
    "Battery low",
    "Akku niedrig"
  ],
  "Battery sufficient": [
    "Battery sufficient",
    "Akku ausreichend"
  ],
  "Akku ausreichend": [
    "Battery sufficient",
    "Akku ausreichend"
  ],
  "unknown": [
    "Unknown",
    "Unbekannt"
  ],
  "unavailable": [
    "Unavailable",
    "Nicht verfügbar"
  ]
};

export function languageFor(hass, override = "auto") {
  const requested = override === "auto"
    ? (hass?.locale?.language || hass?.language || "en") : override;
  return String(requested).toLowerCase().startsWith("de") ? "de" : "en";
}

export function translateState(value, language) {
  const entry = STATES[value];
  return entry ? entry[language === "de" ? 1 : 0] : String(value ?? "");
}

export function buildConfig(language, options = {}) {
  const prefix = options.entity_prefix || (options.legacy ? "katzenklappe" : "smart_cat_flap");
  if (!/^[a-z0-9_]+$/.test(prefix)) throw new Error("Invalid entity_prefix");
  function visit(value) {
    if (Array.isArray(value)) return value.map(visit);
    if (!value || typeof value !== "object") return value;
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      if ((key === "entity" || key === "entity_id") && typeof item === "string") {
        const [domain, original] = item.split(".");
        const suffix = original.replace(/^smart_cat_flap_/, "");
        result[key] = `${domain}.${prefix}_${options.legacy ? (LEGACY[suffix] || suffix) : suffix}`;
      } else if (["name", "title", "label", "content"].includes(key) && typeof item === "string") {
        result[key] = language === "de" ? (GERMAN[item] || item) : item;
      } else result[key] = visit(item);
    }
    // Text states are supplied by firmware, so localize their display in a custom read-only row.
    // Condition states and the underlying hass state object must remain untouched.
    if (result.entity && !result.type && (result.entity.startsWith("event.") ||
        /(?:last_opening_direction|last_test_direction|rfid_match|rfid_test_status|battery_test_status|letzte_oeffnungsrichtung|letzte_testrichtung|rfid_zuordnung|rfid_teststatus|akku_teststatus)$/.test(result.entity))) {
      result.type = "custom:smart-cat-flap-state-row";
      result.language = language;
    }
    return result;
  }
  const cards = visit(TEMPLATE);
  // Optional hardware signals stay unknown until a real measurement supplies them.
  const suffix = key => options.legacy ? (LEGACY[key] || key) : key;
  const label = (en, de) => language === "de" ? de : en;
  cards[1] = {
    type: "entities", title: label("Battery", "Akku"), show_header_toggle: false,
    entities: [
      ["battery_voltage", label("Battery voltage", "Akkuspannung")],
      ["power_source", label("Power source", "Stromversorgung")],
      ["charging_status", label("Charging status", "Ladestatus")],
      ["estimated_runtime", label("Estimated time remaining", "Geschätzte Restlaufzeit")],
    ].map(([key, name]) => ({
      type: "custom:smart-cat-flap-state-row", entity: `sensor.${prefix}_${suffix(key)}`,
      name, language, missing_is_unknown: true,
    })),
  };
  cards[1].entities.push({
    type: "custom:smart-cat-flap-state-row", entity: `binary_sensor.${prefix}_${suffix("battery_low")}`,
    name: label("Battery low", "Akku niedrig"), language, missing_is_unknown: true,
  });
  return {type: "vertical-stack", cards};
}

class SmartCatFlapStateRow extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    const style = document.createElement("style");
    style.textContent = `:host{display:block}button{display:flex;align-items:center;gap:12px;width:100%;min-height:40px;border:0;background:none;color:var(--primary-text-color);font:inherit;text-align:left;cursor:pointer;padding:0 0 0 8px}.label{flex:1;min-width:0}.value{text-align:right;overflow-wrap:anywhere;max-width:55%}button:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}`;
    this._button = document.createElement("button");
    this._button.type = "button";
    this._label = document.createElement("span");
    this._label.className = "label";
    this._value = document.createElement("span");
    this._value.className = "value";
    this._button.append(this._label, this._value);
    this._button.addEventListener("click", () => this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: {entityId: this._config.entity}, bubbles: true, composed: true,
    })));
    root.append(style, this._button);
  }
  setConfig(config) {
    if (!config.entity) throw new Error("An entity is required");
    this._config = config;
    this._label.textContent = config.name || config.entity;
    if (this._hass) this.hass = this._hass;
  }
  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const language = languageFor(hass, this._config.language || "auto");
    const state = hass.states[this._config.entity];
    let value = translateState(state?.state || (this._config.missing_is_unknown ? "unknown" : "unavailable"), language);
    if (state && !["unknown", "unavailable"].includes(state.state) && state.attributes.unit_of_measurement)
      value += ` ${state.attributes.unit_of_measurement}`;
    if (this._config.entity.startsWith("event.") && state && !["unknown", "unavailable"].includes(state.state)) {
      const date = new Date(state.state);
      const type = translateState(state.attributes.event_type || "unknown", language);
      value = Number.isNaN(date.valueOf()) ? type : `${date.toLocaleString(language)} · ${type}`;
    }
    this._value.textContent = value;
  }
}

class SmartCatFlapCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this._generation = 0;
  }
  setConfig(config) {
    if (config.language && !["auto", "de", "en"].includes(config.language)) {
      throw new Error("language must be auto, de or en");
    }
    buildConfig("en", config); // Validate before changing the current card.
    this._config = {...config};
    this._language = null;
    if (this._hass) this.hass = this._hass;
  }
  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const language = languageFor(hass, this._config.language || "auto");
    if (language !== this._language) {
      this._language = language;
      this._render(language);
    } else if (this._card) this._card.hass = hass;
  }
  async _render(language) {
    const generation = ++this._generation;
    try {
      const helpers = await window.loadCardHelpers();
      if (generation !== this._generation) return;
      const card = helpers.createCardElement(buildConfig(language, this._config));
      card.hass = this._hass;
      this.shadowRoot.replaceChildren(card);
      this._card = card;
    } catch (error) {
      if (generation !== this._generation) return;
      this._card = null;
      this._language = null; // Allow a later hass update to retry.
      const message = document.createElement("ha-card");
      message.style.padding = "16px";
      message.textContent = language === "de"
        ? "Katzenklappen-Karte konnte nicht geladen werden. Ressource und Browserprotokoll prüfen."
        : "Could not load the cat flap card. Check the resource and browser log.";
      this.shadowRoot.replaceChildren(message);
      console.error("Smart Cat Flap card", error);
    }
  }
  getCardSize() { return this._card?.getCardSize?.() || 6; }
  static getStubConfig() { return {language: "auto", entity_prefix: "smart_cat_flap"}; }
}

if (!customElements.get("smart-cat-flap-state-row")) customElements.define("smart-cat-flap-state-row", SmartCatFlapStateRow);
if (!customElements.get("smart-cat-flap-card")) customElements.define("smart-cat-flap-card", SmartCatFlapCard);
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === "smart-cat-flap-card")) window.customCards.push({
  type: "smart-cat-flap-card", name: "Smart Cat Flap", description: "Cat flap controls using your Home Assistant language", preview: false,
});
