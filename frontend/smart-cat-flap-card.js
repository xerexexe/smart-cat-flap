// Smart Cat Flap: local-only dashboard translations using Home Assistant's profile language.
// No external dependencies. Optional cat photos use HA media or a user-provided HTTPS URL.
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
  "calibrated": ["Full reference saved", "Vollpunkt gespeichert"],
  "uncertain": ["Estimate uncertain after measurement gap", "Schätzung nach Messlücke unsicher"],
  "uncalibrated": ["Initial full reference needed", "Einmaliger Vollpunkt fehlt"],
  "measurement_unavailable": ["Measurement interrupted; full reference saved", "Messung unterbrochen; Vollpunkt gespeichert"],
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

// Display precision belongs here: ESPHome accuracy_decimals does not round HA's raw state.
export function formatSensorValue(state, entity, language, displayUnit) {
  let raw = state?.state ?? "unknown";
  let unit = state?.attributes?.unit_of_measurement;
  if (displayUnit === "mA" && unit === "A" && String(raw).trim() !== "" && Number.isFinite(Number(raw))) {
    raw = Number(raw) * 1000;
    unit = "mA";
  }
  const count = /(?:openings_since_restart|oeffnungen_seit_neustart|pending_openings|opening_buffer_overflows)$/.test(entity);
  if ((entity.startsWith("sensor.") || entity.startsWith("number.")) && (unit || count)) {
    if (["unknown", "unavailable"].includes(raw)) return translateState(raw, language);
    if (String(raw).trim() === "" || !Number.isFinite(Number(raw)))
      return translateState("unknown", language);
    if (unit === "h" && /_(?:estimated|history)_runtime$/.test(entity) && Number(raw) >= 24) {
      const totalHours = Math.floor(Number(raw));
      const days = Math.floor(totalHours / 24), hours = totalHours % 24;
      const de = language === "de", number = value => new Intl.NumberFormat(language).format(value);
      return `${number(days)} ${de ? (days === 1 ? "Tag" : "Tage") : (days === 1 ? "day" : "days")} ${number(hours)} ${de ? (hours === 1 ? "Stunde" : "Stunden") : (hours === 1 ? "hour" : "hours")}`;
    }
    const precision = count ? 0 : ({V: 2, A: 3, mA: 0, h: 1, mAh: 0, "%": 0, W: 2})[unit];
    const value = new Intl.NumberFormat(language, {
      minimumFractionDigits: precision ?? 0,
      maximumFractionDigits: precision ?? 2,
    }).format(Number(raw));
    return unit ? `${value} ${unit}` : value;
  }
  return translateState(raw, language);
}

export function batteryHistoryNotice(state, language) {
  if (!state) return "";
  const de=language==='de', days=Math.floor(Number(state.attributes?.learning_days)||0);
  if (state.state==='learning') return de?`Lernphase: ${days}/30 Tage`:`Learning: ${days}/30 days`;
  if (state.state==='partial') return de?'Teilweise Messung · Nachtlücken':'Partial measurement · night gaps';
  if (state.state==='stale') return de?'Neue Akkuwerte fehlen':'Awaiting battery readings';
  if (state.state==='storage_error') return de?'Akkuhistorie: Speicherfehler':'Battery history: storage error';
  if (state.state==='no_data') return de?'Akkuhistorie wartet auf Messwerte':'Battery history awaiting readings';
  if (['unknown','unavailable'].includes(state.state)) return de?'Akkuhistorie wird geladen':'Loading battery history';
  return "";
}

// Quality describes the saved estimate, separately from live sensor availability.
export function batteryEstimateNotice(quality, language) {
  const de = language === "de";
  if (quality === "uncertain") return de ? "Schätzung unsicher · Messlücke" : "Uncertain estimate · measurement gap";
  if (quality === "measurement_unavailable") return de ? "Messung unterbrochen · Vollpunkt gespeichert" : "Measurement interrupted · full reference saved";
  if (quality === "uncalibrated") return de ? "Einmaliger Vollpunkt fehlt" : "Initial full reference needed";
  return "";
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
        /(?:last_opening_direction|last_test_direction|rfid_match|rfid_test_status|battery_test_status|letzte_oeffnungsrichtung|letzte_testrichtung|rfid_zuordnung|rfid_teststatus|akku_teststatus|openings_since_restart|oeffnungen_seit_neustart|battery_test_reading|akku_testmesswert)$/.test(result.entity))) {
      result.type = "custom:smart-cat-flap-state-row";
      result.language = language;
    }
    return result;
  }
  const cards = visit(TEMPLATE);
  if (options.reliable_delivery) cards.push({
    type: "entities", title: language === "de" ? "Stromsparen und Zustellung" : "Battery saving and delivery",
    show_header_toggle: false,
    entities: [
      {entity: `switch.${prefix}_experimental_battery_saving`, name: language === "de" ? "Stromsparmodus (experimentell)" : "Battery saving (experimental)"},
      {entity: `number.${prefix}_reporting_interval`, name: language === "de" ? "Meldeintervall" : "Reporting interval"},
      {entity: `sensor.${prefix}_pending_openings`, name: language === "de" ? "Noch nicht bestätigte Öffnungen" : "Unacknowledged openings", type: "custom:smart-cat-flap-state-row", language},
      {entity: `sensor.${prefix}_opening_buffer_overflows`, name: language === "de" ? "Öffnungen bei vollem Puffer" : "Openings rejected by full buffer", type: "custom:smart-cat-flap-state-row", language},
      {entity: `binary_sensor.${prefix}_opening_storage_error`, name: language === "de" ? "Speicherfehler" : "Storage error"},
    ],
  });
  if (options.reliable_delivery) cards.push({
    type: "custom:smart-cat-flap-night-card", language, entity_prefix: prefix,
    timezone: options.night_timezone || "Europe/Berlin",
    source_entity: `sensor.${prefix}_${options.legacy ? (LEGACY.power_source || 'power_source') : 'power_source'}`,
    test_entity: `switch.${prefix}_${options.legacy ? LEGACY.test_mode : 'test_mode'}`,
  });
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
      ["battery_estimate_quality", label("Estimate quality", "Güte der Schätzung")],
      ["battery_current", label("Battery current", "Akkustrom")],
      ["estimated_battery_level", label("Estimated charge level", "Geschätzter Ladestand")],
    ].map(([key, name]) => ({
      type: "custom:smart-cat-flap-state-row", entity: `sensor.${prefix}_${suffix(key)}`,
      name, language, display_unit: key === "battery_current" ? "mA" : undefined, missing_is_unknown: true, retain_last_report: Boolean(options.reliable_delivery),
    })),
  };
  cards[1].entities.push({
    type: "custom:smart-cat-flap-state-row", entity: `number.${prefix}_usable_battery_capacity`,
    name: label("Configured battery capacity", "Eingestellte Akkukapazität"), language, missing_is_unknown: true,
    retain_last_report: Boolean(options.reliable_delivery),
  });
  cards[1].entities.push({
    type: "custom:smart-cat-flap-state-row", entity: `binary_sensor.${prefix}_${suffix("battery_low")}`,
    name: label("Battery low", "Akku niedrig"), language, missing_is_unknown: true,
  });
  return {type: "vertical-stack", cards};
}

export function reportedState(current, previous) {
  if (current && current.state !== "unavailable") {
    return {state: current, retained: false};
  }
  return {state: previous || current, retained: Boolean(previous)};
}

// The firmware reports calibrated charge integration, not voltage-derived percentage.
export function catLocation(value) {
  try {const state=JSON.parse(value);return state&&['inside','outside','unknown'].includes(state.location)&&['manual','opening'].includes(state.source)&&Number.isFinite(state.at)?state:null;}catch(_){return null;}
}

export function batteryColor(level) {
  const value=batteryLevel(level);
  if(value===null)return '#70cfbf';
  if(value<10)return '#ef6464';
  if(value<=50)return '#f3a34f';
  return '#63cf8b';
}

export function batteryLevel(value) {
  if(value===null||value===undefined||String(value).trim()==='')return null;
  const level=Number(value);
  return Number.isFinite(level)&&level>=0&&level<=100?level:null;
}

async function prepareCatPhoto(file) {
  if(!file.type.startsWith('image/')||file.size>25*1024*1024)throw new Error('image');
  const bitmap=await createImageBitmap(file);
  try {
    const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
    const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.86));
    if(!blob)throw new Error('image');
    return new File([blob],`cat-${Date.now()}-${Math.random().toString(36).slice(2,8)}.jpg`,{type:'image/jpeg'});
  } finally { bitmap.close(); }
}

export function catPhotoPath(value) {
  if(typeof value!=='string')return '';
  const path=value.trim().replace(/^media-source:\/\/media_source\/local\/+/,'/media/local/').replace(/^\/media\/local\/+/,'/media/local/');
  if(/^\/media\/local\/[^?#]+\.(?:jpe?g|png|gif|webp)$/i.test(path)||/^\/local\/[^?#]+\.(?:jpe?g|png|gif|webp)$/i.test(path))return path;
  try{const url=new URL(path);return url.protocol==='https:'&&!url.username&&!url.password?url.href:'';}catch(_){return '';}
}

export function nightWindow(start, end) {
  const hour = value => value !== null && value !== undefined && String(value).trim() !== '' &&
    Number.isInteger(Number(value)) && Number(value) >= 0 && Number(value) < 24;
  if (!hour(start) || !hour(end)) return null;
  start = Number(start); end = Number(end);
  const hours = (end - start + 24) % 24;
  return {start, end, hours, segments: !hours ? [] : start < end ? [[start, end]] : [[0, end], [start, 24]].filter(([a,b])=>b>a)};
}

class SmartCatFlapNightCard extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); this._cache = {}; }
  setConfig(config) {
    if (!/^[a-z0-9_]+$/.test(config.entity_prefix || '')) throw new Error('Invalid entity_prefix');
    this._config = config;
    this._cache = {};
    try { this._cache = JSON.parse(localStorage.getItem(`cat-night:v1:${config.entity_prefix}`)) || {}; } catch (_) {}
    if (this._hass) this.hass = this._hass;
  }
  connectedCallback() { this._timer = setInterval(()=>this._update(),60000); }
  disconnectedCallback() { clearInterval(this._timer); }
  set hass(hass) { this._hass = hass; if (this._config) this._update(); }
  _mount(language) {
    this._language = language;
    const de = language === 'de';
    const t = (en,ger)=>de ? ger : en;
    this.shadowRoot.innerHTML = `<style>
      :host{display:block}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);color:var(--primary-text-color)}
      .wrap{padding:22px}.head{display:flex;align-items:center;gap:12px}.moon{font-size:27px;background:rgba(132,117,224,.14);color:#a89bec;border-radius:14px;width:48px;height:48px;display:grid;place-items:center;flex:none}
      h2{font-family:var(--primary-font-family,sans-serif);font-weight:600;font-size:20px;line-height:1.3;margin:0}.eyebrow{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--secondary-text-color);margin-bottom:4px}
      .toggle{margin-left:auto;border:1px solid var(--divider-color);border-radius:22px;padding:8px 12px;background:var(--secondary-background-color);color:var(--primary-text-color);font:600 13px var(--primary-font-family,inherit);cursor:pointer;min-height:44px}
      .toggle[aria-checked=true]{background:#7566b9;color:white;border-color:transparent}button:disabled,select:disabled{opacity:.55;cursor:default}button:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid var(--primary-color);outline-offset:3px}
      .summary{font-size:27px;font-weight:600;margin-top:22px;letter-spacing:-.04em}.subtitle,.caption,.note,details{font-size:13px;line-height:1.6;color:var(--secondary-text-color)}
      .subtitle{margin:5px 0 12px}.graphic{margin:0 -2px}.graphic svg{display:block;width:100%;height:auto}.legend{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:var(--secondary-text-color)}
      .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}.day{background:#d9af63}.night{background:#8c7bcd}
      .fields{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}label{font-size:12px;color:var(--secondary-text-color)}select{display:block;box-sizing:border-box;width:100%;margin-top:6px;padding:12px;border:1px solid var(--divider-color);border-radius:12px;background:var(--secondary-background-color);color:var(--primary-text-color);font-family:var(--primary-font-family,sans-serif);font-size:18px;font-weight:600;min-height:48px}
      .note{padding:12px 14px;background:rgba(132,117,224,.08);border-radius:12px;margin-top:16px}.caption{margin-top:9px;font-size:11px}details{border-top:1px solid var(--divider-color);margin-top:18px;padding-top:12px}summary{cursor:pointer;color:var(--primary-text-color)}details p{margin:9px 0 0}.error{color:var(--error-color);font-size:13px}.error:empty{display:none}
    </style><ha-card><div class="wrap">
      <div class="head"><div class="moon" aria-hidden="true">☾</div><div><div class="eyebrow">${t('Daily schedule','Täglicher Zeitplan')}</div><h2>${t('Night rest','Nachtruhe')}</h2></div><button class="toggle" role="switch" aria-label="${t('Enable night rest','Nachtruhe einschalten')}"></button></div>
      <div class="summary"></div><div class="subtitle"></div><div class="graphic"></div>
      <div class="legend"><span><i class="dot day"></i>${t('Detection active','Erkennung aktiv')}</span><span><i class="dot night"></i>${t('Scheduled rest','Geplante Ruhe')}</span></div>
      <div class="fields"><label>${t('Rest starts','Ruhe ab')}<select data-kind="start" aria-label="${t('Night rest starts','Nachtruhe beginnt')}"></select></label><label>${t('Detection resumes','Wieder aktiv ab')}<select data-kind="end" aria-label="${t('Night rest ends','Nachtruhe endet')}"></select></label></div>
      <div class="note"></div><div class="caption"></div><p class="error" role="alert"></p>
      <details><summary>${t('What happens during night rest?','Was passiert während der Nachtruhe?')}</summary>
      <p>${t('The ESP sleeps deeply. Openings are not detected or recorded during this period, and regular reports pause. Existing buffered events remain saved.','Der ESP schläft tief. Öffnungen werden in dieser Zeit nicht erkannt oder aufgezeichnet; regelmäßige Berichte pausieren. Bereits gepufferte Ereignisse bleiben gespeichert.')}</p>
      <p>${t('USB power or Test mode prevents sleep before it starts. Once asleep, connect USB and press Reset to wake early. The morning timer wakes the ESP automatically.','USB-Versorgung oder Testmodus verhindern das Einschlafen. Für vorzeitiges Aufwecken im Tiefschlaf USB anstecken und Reset drücken. Morgens weckt der Timer den ESP automatisch.')}</p>
      <p>${t('The flap remains mechanically usable. INA3221 and its LEDs stay powered. Overnight consumption is not measured; the remaining-runtime forecast can be optimistic.','Die Klappe bleibt mechanisch benutzbar. INA3221 und seine LEDs bleiben versorgt. Der Nachtverbrauch wird nicht gemessen; die Restlaufzeitprognose kann zu optimistisch sein.')}</p></details>
    </div></ha-card>`;
    const root = this.shadowRoot;
    root.querySelector('.toggle').onclick=()=>this._send('switch',this._enabled==='on'?'turn_off':'turn_on',this._entity('switch','night_rest'));
    for (const field of root.querySelectorAll('select')) {
      field.add(new Option('—',''));
      for (let h=0;h<24;h++) field.add(new Option(`${String(h).padStart(2,'0')}:00`,String(h)));
      field.onchange=()=> { if(field.value!=='') this._send('number','set_value',this._entity('number',`night_rest_${field.dataset.kind}_hour`),{value:Number(field.value)}); };
    }
  }
  _entity(domain,suffix) { return `${domain}.${this._config.entity_prefix}_${suffix}`; }
  async _send(domain,action,entity,extra={}) {
    const error=this.shadowRoot.querySelector('.error'); error.textContent='';
    try { await this._hass.callService(domain,action,{entity_id:entity,...extra}); }
    catch (_) { error.textContent=this._language==='de'?'Änderung fehlgeschlagen. Bitte Verbindung prüfen.':'Change failed. Please check the connection.'; this._update(); }
  }
  _read(entity,valid) {
    const state=this._hass.states[entity]?.state;
    if(state && state!=='unavailable') {
      if(valid(state)) this._cache[entity]=state; else delete this._cache[entity];
      return valid(state)?state:null;
    }
    return valid(this._cache[entity])?this._cache[entity]:null;
  }
  _update() {
    if(!this._config||!this._hass) return;
    const language=languageFor(this._hass,this._config.language||'auto');
    if(language!==this._language) this._mount(language);
    const root=this.shadowRoot,de=language==='de',t=(en,ger)=>de?ger:en;
    const enabledEntity=this._entity('switch','night_rest');
    this._enabled=this._read(enabledEntity,v=>v==='on'||v==='off');
    const validHour=v=>nightWindow(v,0)!==null;
    const start=this._read(this._entity('number','night_rest_start_hour'),validHour);
    const end=this._read(this._entity('number','night_rest_end_hour'),validHour);
    const window=nightWindow(start,end),enabled=this._enabled==='on';
    const current=this._hass.states[enabledEntity]?.state;
    const online=current==='on'||current==='off';
    try { const value=JSON.stringify(this._cache); if(value!==this._stored) { localStorage.setItem(`cat-night:v1:${this._config.entity_prefix}`,value); this._stored=value; } } catch (_) {}
    const toggle=root.querySelector('.toggle');
    toggle.textContent=this._enabled===null?t('Unknown','Unbekannt'):enabled?t('On','Ein'):t('Off','Aus');
    toggle.setAttribute('aria-checked',String(enabled)); toggle.disabled=!online;
    toggle.setAttribute('aria-label',enabled?t('Disable night rest','Nachtruhe ausschalten'):t('Enable night rest','Nachtruhe einschalten'));
    const hour=v=>`${String(v).padStart(2,'0')}:00`;
    root.querySelector('.summary').textContent=window?`${hour(window.start)} – ${hour(window.end)}`:t('Schedule unavailable','Zeitplan unbekannt');
    root.querySelector('.subtitle').textContent=window?(window.hours?`${window.hours} ${t('hours of scheduled rest per day','Stunden geplante Ruhe pro Tag')}`:t('Matching times: no rest period','Gleiche Uhrzeiten: keine Ruhephase')):'';
    for(const field of root.querySelectorAll('select')) {
      const entity=this._entity('number',`night_rest_${field.dataset.kind}_hour`);
      const value=field.dataset.kind==='start'?start:end;
      if(root.activeElement!==field) field.value=value===null?'':String(Number(value));
      field.disabled=!validHour(this._hass.states[entity]?.state);
    }
    const usb=this._hass.states[this._config.source_entity]?.state==='usb';
    const test=this._hass.states[this._config.test_entity]?.state==='on';
    root.querySelector('.note').textContent=this._enabled===null?t('The setting is currently unknown.','Die Einstellung ist aktuell unbekannt.'):!enabled?t('Night rest is off. Detection and reports follow the normal battery-saving mode.','Nachtruhe ist aus. Erkennung und Berichte folgen dem normalen Stromsparmodus.'):usb||test?t('USB power or Test mode is active. The ESP stays awake.','USB-Versorgung oder Testmodus ist aktiv. Der ESP bleibt wach.'):window&&!window.hours?t('Choose different start and end times to schedule rest.','Wähle unterschiedliche Start- und Endzeiten für eine Ruhephase.'):t('Schedule enabled. Detection and reports pause during the rest period.','Zeitplan eingeschaltet. Während der Ruhephase pausieren Erkennung und Berichte.');
    root.querySelector('.caption').textContent=`${this._enabled===null?t('Setting unknown','Einstellung unbekannt'):enabled?t('Schedule','Zeitplan'):t('Preview · currently off','Vorschau · aktuell ausgeschaltet')} · ${this._config.timezone}${!online?t(' · Device offline; showing last reported settings',' · Gerät offline; zuletzt gemeldete Einstellungen'):''}`;
    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg'); svg.setAttribute('viewBox','0 0 300 76'); svg.setAttribute('role','img'); svg.setAttribute('aria-label',t('24-hour schedule. Purple: planned rest; gold: detection.','24-Stunden-Zeitplan. Violett: geplante Ruhe; Gold: Erkennung.'));
    const add=(tag,attrs)=>{const e=document.createElementNS(ns,tag); for(const [k,v]of Object.entries(attrs))e.setAttribute(k,v); svg.append(e); return e;};
    add('rect',{x:6,y:16,width:288,height:18,rx:9,fill:window?'#d9af63':'#888',opacity:enabled?1:.45});
    for(const [a,b]of window?.segments||[])add('rect',{x:6+a*12,y:16,width:(b-a)*12,height:18,rx:Math.min(9,(b-a)*6),fill:'#8c7bcd',opacity:enabled?1:.55});
    for(const h of [0,6,12,18,24]){add('line',{x1:6+h*12,x2:6+h*12,y1:39,y2:43,stroke:'var(--divider-color)'});add('text',{x:6+h*12,y:59,'text-anchor':h===0?'start':h===24?'end':'middle',fill:'var(--secondary-text-color)','font-size':10}).textContent=`${String(h).padStart(2,'0')}:00`;}
    try {
      const parts=new Intl.DateTimeFormat('en-GB',{timeZone:this._config.timezone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
      const now=Number(parts.find(p=>p.type==='hour').value)+Number(parts.find(p=>p.type==='minute').value)/60;
      add('line',{x1:6+now*12,x2:6+now*12,y1:10,y2:38,stroke:'var(--primary-text-color)','stroke-width':2});
      add('circle',{cx:6+now*12,cy:8,r:3,fill:'var(--primary-text-color)'});
    } catch (_) {}
    root.querySelector('.graphic').replaceChildren(svg);
  }
  getCardSize() { return 5; }
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
    this._lastReport = undefined;
    if (config.retain_last_report) {
      try {
        const saved = JSON.parse(localStorage.getItem(`smart-cat-flap-report:v1:${config.entity}`));
        if (saved && typeof saved.state === "string" && saved.last_updated && saved.attributes)
          this._lastReport = saved;
      } catch (_) { /* Storage may be disabled by the browser. */ }
    }
    this._label.textContent = config.name || config.entity;
    if (this._hass) this.hass = this._hass;
  }
  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const language = languageFor(hass, this._config.language || "auto");
    const current = hass.states[this._config.entity];
    if (this._config.retain_last_report && current && current.state !== "unavailable") {
      const saved = {state: current.state, last_updated: current.last_updated,
        attributes: {unit_of_measurement: current.attributes?.unit_of_measurement}};
      if (JSON.stringify(saved) !== JSON.stringify(this._lastReport)) {
        this._lastReport = saved;
        try { localStorage.setItem(`smart-cat-flap-report:v1:${this._config.entity}`, JSON.stringify(saved)); }
        catch (_) { /* Still retain the reading in memory. */ }
      }
    }
    const displayed = this._config.retain_last_report ? reportedState(current, this._lastReport) : {state: current};
    const state = displayed.state;
    let value = formatSensorValue(state || {
      state: this._config.missing_is_unknown ? "unknown" : "unavailable",
    }, this._config.entity, language, this._config.display_unit);
    const historyStatus=hass.states[this._config.entity.replace(/_history_runtime$/, '_history_model_status')];
    if (/_history_model_status$/.test(this._config.entity)) value=batteryHistoryNotice(current,language)||(language==='de'?'Bereit':'Ready');
    if (/_history_runtime$/.test(this._config.entity) && historyStatus?.state!=='partial') value=batteryHistoryNotice(historyStatus,language)||value;
    if (this._config.entity.startsWith("event.") && state && !["unknown", "unavailable"].includes(state.state)) {
      const date = new Date(state.state);
      const type = translateState(state.attributes.event_type || "unknown", language);
      value = Number.isNaN(date.valueOf()) ? type : `${date.toLocaleString(language)} · ${type}`;
    }
    if (displayed.retained) {
      const date = new Date(state.last_updated);
      const stamp = Number.isNaN(date.valueOf()) ? "" : date.toLocaleTimeString(language);
      value += ` · ${language === "de" ? "Stand" : "As of"} ${stamp}`;
    }
    this._value.textContent = value;
  }
}


class SmartCatFlapLocation extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});}
  setConfig(config){this._config=config;}
  set hass(hass){this._hass=hass;if(!this._config)return;if(!this.shadowRoot.querySelector('.location'))this._render();this._update();}
  _render(){
    const de=this._config.language==='de',t=(en,ger)=>de?ger:en;
    this.shadowRoot.innerHTML=`<style>:host{display:block;color:var(--primary-text-color);--loc-accent:var(--cat-accent,#70cfbf)}.location{margin-top:12px}.summary{display:flex;align-items:center;gap:12px}.scene{width:230px;height:154px;flex:none}.location:not(.compact) .summary{flex-direction:row-reverse;justify-content:space-between;gap:18px}@media(max-width:420px){.location:not(.compact) .scene{width:170px;height:114px}.location:not(.compact) .summary{gap:10px}}.cat{fill:var(--loc-accent);transition:transform .65s ease}.cat-life{transform-origin:13px 46px;animation:cat-idle 3.4s ease-in-out infinite}.cat-tail{transform-origin:4px 42px;animation:cat-tail-sway 2.8s ease-in-out infinite}.cat-eye{transform-box:fill-box;transform-origin:center;animation:cat-blink 6.5s infinite}.outside-tree{fill:var(--loc-accent);fill-opacity:.1;stroke:var(--secondary-text-color);stroke-width:1.5;stroke-linejoin:round}@keyframes cat-idle{0%,100%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-.7px) scaleY(1.025)}}@keyframes cat-tail-sway{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(11deg)}}@keyframes cat-blink{0%,43%,47%,100%{transform:scaleY(1)}45%{transform:scaleY(.1)}}.flap{stroke:var(--secondary-text-color);stroke-width:1.5;fill:none}.side{font-size:8px;fill:var(--secondary-text-color)}.label{font-size:14px;font-weight:600}.source,.message{font-size:10px;color:var(--secondary-text-color);line-height:1.5}.correct{font:inherit;font-size:11px;color:var(--loc-accent);background:none;border:0;padding:8px 0;cursor:pointer}.options{display:flex;flex-wrap:wrap;gap:6px}.options[hidden]{display:none}.options button{border:1px solid var(--divider-color);border-radius:9px;background:var(--secondary-background-color);color:var(--primary-text-color);font:inherit;font-size:11px;padding:7px 10px;cursor:pointer;min-height:32px}.options button[aria-pressed=true]{border-color:var(--loc-accent);color:var(--loc-accent)}.options button:disabled,.correct:disabled{opacity:.45;cursor:default}.location.compact{position:relative;min-height:82px;margin-top:10px;padding-top:12px;padding-right:52%}.compact .scene{position:absolute;right:0;top:-48px;width:50%;height:132px}.compact .summary{display:block}.compact .label{font-size:12px}.compact .correct{padding:8px 0;text-align:left}.compact .options{position:relative;margin-right:-108%}.compact .message{margin-right:-108%}@media(prefers-reduced-motion:reduce){.cat{transition:none}.cat-life,.cat-tail,.cat-eye{animation:none}}</style><div class="location ${this._config.compact?'compact':''}"><div class="summary"><svg class="scene" viewBox="0 0 150 65" role="img"><title>${t('Estimated cat location','Geschätzter Aufenthaltsort der Katze')}</title><path class="flap" d="M65 47V8h20v39M70 43V14h10v29ZM8 20l10-9 10 9M12 18v12h12V18"/><path class="flap" d="M3 48h144" opacity=".3"/><path class="outside-tree" d="M137 75V63M137 34l-10 16h5l-9 13h28l-9-13h5Z"/><g class="cat" transform="translate(54,0)"><g class="cat-life"><path class="cat-tail" d="M4 42q-7-3-6-10" fill="none" stroke="var(--loc-accent)" stroke-width="3" stroke-linecap="round"/><ellipse cx="13" cy="37" rx="10" ry="9"/><path d="M4 29l-1-11 8 5h5l8-5-1 11Z"/><circle cx="13" cy="28" r="9"/><circle class="cat-eye" cx="10" cy="27" r="1" fill="var(--card-background-color)"/><circle class="cat-eye" cx="17" cy="27" r="1" fill="var(--card-background-color)"/></g></g><text class="side" x="8" y="61">${t('Inside','Drinnen')}</text><text class="side" x="111" y="61">${t('Outside','Draußen')}</text></svg><div><div class="label"></div><div class="source"></div></div></div><button class="correct" aria-expanded="false">${t('Correct location','Aufenthalt korrigieren')}</button><div class="options" hidden><button data-location="inside">${t('Inside','Drinnen')}</button><button data-location="outside">${t('Outside','Draußen')}</button><button data-location="unknown">${t('Unknown','Unbekannt')}</button></div><div class="message" role="status"></div></div>`;
    {
      const scene=this.shadowRoot.querySelector('.scene');scene.setAttribute('viewBox','0 0 150 100');
      const paths=scene.querySelectorAll('.flap');paths[0].setAttribute('d','M60 75V7h30v68M66 68V15h18v53ZM8 47l10-9 10 9M12 45v12h12V45');paths[1].setAttribute('d','M3 76h144');
      scene.querySelectorAll('.side').forEach(label=>label.setAttribute('y','94'));
    }
    const button=this.shadowRoot.querySelector('.correct'),options=this.shadowRoot.querySelector('.options');button.onclick=()=>{options.hidden=!options.hidden;button.setAttribute('aria-expanded',String(!options.hidden));};
    this.shadowRoot.querySelectorAll('[data-location]').forEach(button=>button.onclick=async()=>{
      this._saving=true;this._update();const message=this.shadowRoot.querySelector('.message');
      try{await this._hass.callService('input_text','set_value',{entity_id:this._config.location_entity||'input_text.smart_cat_flap_cat_location',value:JSON.stringify({location:button.dataset.location,source:'manual',at:Date.now()/1000})});message.textContent=t('Location corrected.','Aufenthalt korrigiert.');}catch(_){message.textContent=t('Could not save the location.','Aufenthalt konnte nicht gespeichert werden.');}finally{this._saving=false;this._update();}
    });
  }
  _update(){
    const root=this.shadowRoot,state=this._hass.states[this._config.location_entity||'input_text.smart_cat_flap_cat_location'],record=catLocation(state?.state),where=record?.location||'unknown',t=(en,de)=>this._config.language==='de'?de:en;
    root.querySelector('.label').textContent=where==='inside'?t('Inside','Drinnen'):where==='outside'?t('Outside','Draußen'):t('Location unknown','Aufenthalt unbekannt');
    root.querySelector('.source').textContent=record?.source==='manual'?t('Manually set','Manuell gesetzt'):record?.source==='opening'?t('Inferred from opening','Aus Öffnung abgeleitet'):t('Please set location','Bitte festlegen');
    root.querySelector('.cat').style.transform=`translate(${where==='inside'?25:where==='outside'?111:62}px,${28}px)`;
    root.querySelector('.cat').style.opacity=where==='unknown'?'.3':'1';
    root.querySelector('.scene').setAttribute('aria-label',root.querySelector('.label').textContent);
    const enabled=state&&state.state!=='unavailable'&&!this._saving;
    root.querySelector('.correct').disabled=!enabled;
    root.querySelectorAll('[data-location]').forEach(button=>{button.disabled=!enabled;button.setAttribute('aria-pressed',String(button.dataset.location===where));});
  }
}

export class SmartCatFlapCard extends HTMLElement {
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
    } else if (this._cards) {
      for (const card of this._cards) card.hass = hass;
      this._updateOverview();
    }
  }
  async _render(language) {
    const generation = ++this._generation;
    try {
      const helpers = await window.loadCardHelpers();
      if (generation !== this._generation) return;
      const de=language==='de', t=(en,ger)=>de?ger:en;
      const config=buildConfig(language,this._config);
      const historyPrefix=this._config.entity_prefix||(this._config.legacy?'katzenklappe':'smart_cat_flap');
      if(this._hass.states[`sensor.${historyPrefix}_history_runtime`]) config.cards[1].entities[3].entity=`sensor.${historyPrefix}_history_runtime`;

      this.shadowRoot.innerHTML=`<style>
        :host{display:block;color:var(--primary-text-color);--cat-accent:#70cfbf;--cat-muted:var(--secondary-text-color);--cat-line:var(--divider-color)}
        *{box-sizing:border-box}.dashboard{max-width:1160px;margin:0 auto;padding:28px 24px 40px;font-family:var(--primary-font-family,sans-serif)}
        .masthead{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px}.brand{display:flex;align-items:center;gap:12px}.brand-mark{width:48px;height:48px;border-radius:16px;background:rgba(112,207,191,.14);display:grid;place-items:center;color:var(--cat-accent);font-size:27px}.brand h1{font-size:26px;letter-spacing:-.035em;margin:0;font-weight:650}.eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--cat-muted);margin-bottom:5px}.date{font-size:12px;color:var(--cat-muted);text-align:right}
        .hero{border:1px solid rgba(112,207,191,.22);background:linear-gradient(115deg,rgba(72,152,145,.16),rgba(65,85,126,.16));box-shadow:inset 0 3px 0 var(--hero-battery-color,#70cfbf);border-radius:26px;padding:28px 32px;display:grid;grid-template-columns:1fr 245px;align-items:center;gap:20px;min-height:240px;margin-bottom:18px;overflow:hidden}.status{display:inline-flex;align-items:center;gap:7px;font-size:12px;color:var(--cat-accent);margin-bottom:16px}.status-dot{width:7px;height:7px;background:currentColor;border-radius:50%}.hero h2{font-size:36px;font-weight:650;line-height:1.12;letter-spacing:-.045em;margin:0 0 12px;max-width:580px}.hero p{font-size:14px;color:var(--cat-muted);max-width:500px;line-height:1.65;margin:0}.hero svg{width:100%;max-width:245px;justify-self:end}.hero-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}.tag{font-size:11px;border:1px solid var(--cat-line);border-radius:30px;padding:6px 10px;background:rgba(127,127,127,.06)}
        .cat-photo{width:220px;height:200px;object-fit:cover;border-radius:24px;justify-self:end}.cat-photo[hidden]{display:none}.photo-preview{width:54px;height:54px;border-radius:16px;object-fit:cover;background:rgba(112,207,191,.08);margin-right:12px}.photo-intro{display:flex;align-items:center;margin-bottom:14px}.photo-input{width:100%;padding:12px;border:1px solid var(--cat-line);border-radius:12px;background:var(--secondary-background-color);color:var(--primary-text-color);font:inherit;margin:12px 0 10px}.photo-save{border:0;padding:10px 15px;border-radius:12px;background:var(--cat-accent);color:#173a36;font:inherit;cursor:pointer;min-height:42px}.photo-save:disabled{opacity:.5;cursor:default}.photo-message{font-size:12px;line-height:1.6;color:var(--cat-muted);margin-top:10px}.media-link{color:var(--cat-accent)}
        .grid{display:grid;grid-template-columns:minmax(0,1.13fr) minmax(0,1fr);gap:18px;align-items:start}.column{display:grid;gap:18px;min-width:0}.panel{border:1px solid var(--cat-line);background:var(--ha-card-background,var(--card-background-color));border-radius:22px;padding:24px;min-width:0}.panel h3{font-size:18px;margin:0;font-weight:600;letter-spacing:-.02em}.panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:22px}.small{font-size:12px;color:var(--cat-muted);line-height:1.65}.mini-icon{color:var(--cat-accent);font-size:20px}.opening-title{font-size:27px;font-weight:650;letter-spacing:-.035em;margin:0 0 6px}.opening-date{font-size:12px;color:var(--cat-muted);min-height:20px}.flow{display:grid;grid-template-columns:1fr 1.1fr 1fr;align-items:center;text-align:center;margin:26px 0}.location{font-size:12px;color:var(--cat-muted)}.location ha-icon{display:block;margin:0 auto 8px;--mdc-icon-size:30px;color:var(--primary-text-color)}.flow-line{height:1px;background:var(--cat-line);position:relative}.flow-arrow{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:var(--ha-card-background,var(--card-background-color));border:1px solid var(--cat-line);color:var(--cat-accent);height:36px;width:36px;display:grid;place-items:center;font-size:21px}.metrics{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding-top:18px;border-top:1px solid var(--cat-line)}.metric-value{font-size:26px;font-weight:600;letter-spacing:-.03em;margin-bottom:4px}.metric-name{font-size:11px;color:var(--cat-muted);line-height:1.5}.explanation{margin-top:18px;font-size:11px;color:var(--cat-muted);line-height:1.6}
        .battery-main{display:flex;align-items:center;gap:22px}.battery-symbol{color:var(--battery-color,var(--cat-accent));width:100px;height:120px;flex:none;overflow:visible}.battery-liquid{opacity:0;transition:opacity .3s}.has-level .battery-liquid{opacity:1}.battery-wave{fill:var(--battery-color,var(--cat-accent));opacity:.55}.battery-wave.back{opacity:.22}.has-level .battery-wave{animation:cat-wave 3.2s linear infinite}.has-level .battery-wave.back{animation:cat-wave 4.8s linear infinite reverse}.battery-level-position{transition:transform 1.5s ease}.is-charging .battery-symbol{filter:drop-shadow(0 0 7px rgba(112,207,191,.16))}.battery-motion{font-size:11px;color:var(--cat-muted);margin-top:5px}.battery-motion[hidden]{display:none}@keyframes cat-wave{from{transform:translateX(0)}to{transform:translateX(-60px)}}@media(prefers-reduced-motion:reduce){.has-level .battery-wave,.has-level .battery-wave.back{animation:none}.battery-level-position{transition:none}}.voltage{font-size:34px;font-weight:600;letter-spacing:-.04em;margin-bottom:3px}.charge{font-size:13px;color:var(--cat-accent);line-height:1.5}.battery-meta{margin:20px 0 14px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}.runtime{font-size:22px;font-weight:600}.battery-warning{font-size:12px;color:var(--warning-color,#e5b668);padding:10px 12px;border-radius:10px;background:rgba(225,166,73,.1);margin-top:14px}.battery-warning[hidden]{display:none}.stamp{font-size:11px;color:var(--cat-muted);margin-top:14px}
        details summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:15px;font-weight:600;min-height:36px}details summary::-webkit-details-marker{display:none}details summary:after{content:'+';font-size:22px;color:var(--cat-muted);font-weight:400}details[open] summary:after{content:'−'}.details-copy{margin:4px 0 0;font-size:12px;line-height:1.6;color:var(--cat-muted)}.native{margin-top:16px}.native:empty{display:none}.native>*{display:block;margin-top:10px}.test-active{color:var(--warning-color,#e5b668)}.footer{font-size:11px;color:var(--cat-muted);text-align:center;margin-top:24px}.pending{color:var(--warning-color,#e5b668)}button.info{padding:0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}button:focus-visible,summary:focus-visible{outline:2px solid var(--primary-color);outline-offset:4px}
        @media(max-width:760px){.dashboard{padding:16px 12px 28px}.grid{grid-template-columns:1fr}.hero{grid-template-columns:1fr 125px;padding:24px;min-height:215px}.hero h2{font-size:29px}.hero svg{width:135px;margin-right:-12px}.cat-photo{width:135px;height:155px}.brand h1{font-size:23px}.date{display:none}.panel{padding:22px}.column{gap:14px}.grid{gap:14px}}
        @media(max-width:420px){.hero{grid-template-columns:1fr;position:relative;min-height:235px;padding:24px}.hero svg{position:absolute;width:105px;right:10px;bottom:8px;opacity:.45}.cat-photo{width:100%;height:200px;position:static;margin-top:12px}.hero h2,.hero p{max-width:245px}.hero-tags{padding-right:65px}.battery-main{gap:14px}.voltage{font-size:30px}.masthead{margin-bottom:16px}}
      </style><div class="dashboard">
        <header class="masthead"><div class="brand"><div class="brand-mark"><ha-icon icon="mdi:cat"></ha-icon></div><div><div class="eyebrow">${t('A little freedom','Ein Stück Freiheit')}</div><h1>${t('Smart Cat Flap','Katzenklappe')}</h1></div></div><div class="date"></div></header>
        <section class="hero"><div><div class="status"><i class="status-dot"></i><span class="status-label"></span></div><h2 class="hero-title"></h2><p class="hero-copy"></p><div class="hero-tags"><span class="tag ready-tag"></span><span class="tag report-tag"></span></div></div>
        <svg viewBox="0 0 245 200" role="img" aria-label="${t('Illustration of a cat beside its flap','Illustration einer Katze neben ihrer Klappe')}"><circle cx="130" cy="95" r="87" fill="rgba(112,207,191,.07)"/><path d="M18 181h211" stroke="rgba(112,207,191,.25)" stroke-width="2"/><rect x="40" y="22" width="126" height="158" rx="19" fill="none" stroke="#70cfbf" stroke-width="3"/><rect x="52" y="34" width="102" height="133" rx="12" fill="rgba(112,207,191,.06)" stroke="rgba(112,207,191,.25)"/><path d="M58 46h90l-17 99H72Z" fill="rgba(112,207,191,.13)" stroke="#70cfbf" stroke-width="2"/><circle cx="123" cy="130" r="3" fill="#70cfbf"/><path d="M160 178c-8-17-9-42 3-56l-2-26 17 13c8-3 17-2 24 1l17-12-3 28c8 17 6 35-5 52Z" fill="#70cfbf"/><path d="M169 172c-22 2-29-14-24-29" fill="none" stroke="#70cfbf" stroke-width="10" stroke-linecap="round"/><path d="M179 129h2m16 0h2" stroke="#204f4c" stroke-width="4" stroke-linecap="round"/><path d="m187 137 4 0-2 3Z" fill="#204f4c"/><path d="M21 61h8m-4-4v8m170-29h8m-4-4v8" stroke="rgba(112,207,191,.5)" stroke-width="2" stroke-linecap="round"/></svg></section>
        <div class="grid"><div class="column">
          <section class="panel activity"><div class="panel-head"><h3>${t('At the flap','An der Klappe')}</h3><ha-icon icon="mdi:paw" class="mini-icon"></ha-icon></div><div class="eyebrow">${t('Last reported opening','Letzte gemeldete Öffnung')}</div><button class="info opening-title" data-info="last_opening_direction"></button><div class="opening-date"></div><div class="flow"><div class="location"><ha-icon icon="mdi:home-outline"></ha-icon>${t('Inside','Innen')}</div><div class="flow-line"><span class="flow-arrow"></span></div><div class="location"><ha-icon icon="mdi:tree-outline"></ha-icon>${t('Outside','Außen')}</div></div><div class="metrics"><div><div class="metric-value opening-count"></div><div class="metric-name">${t('Openings since restart','Öffnungen seit Neustart')}</div></div><div><div class="metric-value pending-count"></div><div class="metric-name">${t('Awaiting confirmation','Warten auf Bestätigung')}</div></div></div><div class="location-slot"></div><div class="explanation">${t('The direction describes flap movement. It does not confirm where your cat is.','Die Richtung beschreibt die Bewegung der Klappe. Sie bestätigt nicht den Aufenthaltsort deiner Katze.')}</div></section>
          <div class="night-slot"></div>
        </div><div class="column">
          <section class="panel battery"><div class="panel-head"><h3>${t('Energy','Energie')}</h3><span class="tag power-tag"></span></div><div class="battery-main"><svg class="battery-symbol" viewBox="0 0 100 120" aria-hidden="true"><rect x="35" y="5" width="30" height="8" rx="4" fill="currentColor"/><rect x="14" y="17" width="72" height="95" rx="17" fill="rgba(112,207,191,.08)" stroke="currentColor" stroke-width="2"/><defs><clipPath id="cat-battery-window"><rect x="20" y="23" width="60" height="83" rx="12"/></clipPath></defs><g class="battery-liquid" clip-path="url(#cat-battery-window)"><g class="battery-level-position"><path class="battery-wave back" d="M-60 0 Q-45 -5 -30 0 T0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 V160 H-60Z"/><path class="battery-wave" d="M-60 0 Q-45 -5 -30 0 T0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 V160 H-60Z"/></g></g><path class="battery-bolt" d="m54 37-20 31h15l-3 23 22-33H52Z" fill="currentColor"/></svg><div><div class="eyebrow">${t('Battery voltage','Akkuspannung')}</div><button class="info voltage" data-info="battery_voltage"></button><div class="charge"></div><div class="battery-motion" hidden></div></div></div><div class="battery-meta"><span class="runtime"></span><span class="small">${t('estimated on battery','geschätzt im Akkubetrieb')}</span></div><div class="small">${t('Charge level and runtime are estimates based on measured current since full-battery calibration.','Ladestand und Laufzeit sind Schätzungen aus der Strommessung seit der Voll-Kalibrierung.')}</div><div class="battery-warning" hidden></div><div class="stamp"></div></section>
          <section class="panel profile"><div class="panel-head"><h3>${t('Your cat','Deine Katze')}</h3><ha-icon icon="mdi:cat" class="mini-icon"></ha-icon></div><div class="photo-intro"><img class="photo-preview" hidden alt="${t('Your cat','Deine Katze')}"><p class="small">${t('One photo for your dashboard and opening notifications.','Ein Foto für dein Dashboard und die Öffnungsbenachrichtigungen.')}</p></div><button class="photo-save photo-choose">${t('Choose photo','Foto auswählen')}</button><input class="photo-file" type="file" accept="image/*" hidden><p class="small">${t('Choose an image from your phone or computer. It is resized and saved in Home Assistant.','Wähle ein Bild vom Handy oder PC. Es wird verkleinert und in Home Assistant gespeichert.')}</p><details><summary>${t('Add or change photo','Foto hinterlegen oder ändern')}</summary><p class="details-copy">${t('Upload a photo in Home Assistant Media, then enter its path below. For example: /media/local/cat.jpg. Leave empty to remove it.','Lade ein Foto unter Medien in Home Assistant hoch und trage unten den Pfad ein. Zum Beispiel: /media/local/katze.jpg. Zum Entfernen leer lassen.')}</p><a class="media-link small" href="/media-browser">${t('Open Media','Medien öffnen')}</a><input class="photo-input" aria-label="${t('Cat photo path or HTTPS URL','Pfad oder HTTPS-Adresse des Katzenfotos')}" placeholder="/media/local/katze.jpg" maxlength="255"><button class="photo-save photo-path-save">${t('Save photo','Foto übernehmen')}</button><div class="photo-message" role="status"></div></details></section>
          <section class="panel"><details class="settings"><summary>${t('Power & device','Strom & Gerät')}</summary><p class="details-copy">${t('Live battery readings and device settings. Negative battery current means charging; positive means discharge. Capacity is the configured value, not a capacity measurement.','Aktuelle Akkuwerte und Geräteeinstellungen. Negativer Akkustrom bedeutet Laden, positiver Entladen. Die Kapazität ist eingestellt, nicht gemessen.')}</p><div class="native settings-content"></div></details></section>
          <section class="panel"><details class="diagnostics"><summary>${t('Tests & diagnostics','Tests & Diagnose')}</summary><p class="details-copy">${t('Enable Test mode here. Simulations appear only while it is enabled.','Hier schaltest du den Testmodus ein. Simulationen erscheinen nur, solange er aktiv ist.')}</p><div class="native diagnostic-content"></div></details><div class="native tests-content"></div></section>
          <div class="native rfid-content"></div>
        </div></div><footer class="footer">${t('Your flap. Your schedule.','Deine Klappe. Dein Zeitplan.')}</footer>
      </div>`;
      const photo=document.createElement('img');photo.className='cat-photo';photo.alt=t('Your cat','Deine Katze');photo.hidden=true;photo.onerror=()=>{photo.hidden=true;this.shadowRoot.querySelector('.hero svg').style.display='';};
      this.shadowRoot.querySelector('.hero').append(photo);
      this._photoPath=undefined;
      this.shadowRoot.querySelector('.photo-preview').onerror=()=>{this.shadowRoot.querySelector('.photo-preview').hidden=true;};
      this.shadowRoot.querySelector('.photo-path-save').onclick=async()=>{
        const raw=this.shadowRoot.querySelector('.photo-input').value.trim(),path=catPhotoPath(raw),message=this.shadowRoot.querySelector('.photo-message');
        if(raw&&!path){message.textContent=t('Use a local image path or an HTTPS address.','Bitte einen lokalen Bildpfad oder eine HTTPS-Adresse verwenden.');return;}
        try{await this._hass.callService('input_text','set_value',{entity_id:this._config.cat_photo_entity||'input_text.smart_cat_flap_cat_photo',value:path});message.textContent=t('Photo setting saved.','Foto-Einstellung gespeichert.');}catch(_){message.textContent=t('Could not save the photo setting. Check the helper and connection.','Foto-Einstellung konnte nicht gespeichert werden. Bitte Helfer und Verbindung prüfen.');}
      };
      this.shadowRoot.querySelector('.photo-choose').onclick=()=>this.shadowRoot.querySelector('.photo-file').click();
      this.shadowRoot.querySelector('.photo-file').onchange=async(event)=>{
        const file=event.target.files?.[0];if(!file)return;
        const message=this.shadowRoot.querySelector('.photo-message');
        this.shadowRoot.querySelector('.profile details').open=true;
        this._photoUploading=true;this._updateOverview();
        message.textContent=t('Preparing and uploading photo…','Foto wird vorbereitet und hochgeladen …');
        try {
          const image=await prepareCatPhoto(file),body=new FormData();
          body.append('media_content_id','media-source://media_source/local');body.append('file',image);
          const response=await this._hass.fetchWithAuth('/api/media_source/local_source/upload',{method:'POST',body});
          if(!response.ok)throw new Error(`upload:${response.status}`);
          const uploaded=await response.json(),path=catPhotoPath(uploaded.media_content_id);
          if(!path)throw new Error('path');
          await this._hass.callService('input_text','set_value',{entity_id:this._config.cat_photo_entity||'input_text.smart_cat_flap_cat_photo',value:path});
          message.textContent=t('Photo saved for your dashboard and opening notifications.','Foto für Dashboard und Öffnungsbenachrichtigungen gespeichert.');
        } catch(error) {
          message.textContent=t('Could not save the photo. Choose a supported image (JPEG/PNG), max. 25 MB. Uploading requires a Home Assistant administrator and local media.','Foto konnte nicht gespeichert werden. Bitte ein unterstütztes Bild (JPEG/PNG) bis 25 MB auswählen. Hochladen benötigt einen Home-Assistant-Administrator und lokale Medien.');
        } finally {this._photoUploading=false;event.target.value='';this._updateOverview();}
      };
      const mount=(selector,definition)=>{const card=helpers.createCardElement(definition);card.hass=this._hass;this.shadowRoot.querySelector(selector).append(card);return card;};
      this._cards=[];
      this._mountLocation(false);
      const prefix=this._config.entity_prefix||(this._config.legacy?'katzenklappe':'smart_cat_flap');
      const suffix=key=>this._config.legacy?(LEGACY[key]||key):key;
      const diagnostics={...config.cards[0],entities:[...config.cards[0].entities,
        {entity:`binary_sensor.${prefix}_${suffix('inside_contact')}`,name:t('Inside contact','Kontakt innen')},
        {entity:`binary_sensor.${prefix}_${suffix('outside_contact')}`,name:t('Outside contact','Kontakt außen')},
      ]};
      const roamEntity=`button.${prefix}_check_wifi_access_point`;
      if(this._hass.states[roamEntity]) diagnostics.entities.push({entity:roamEntity,name:t('Check WiFi access point','WLAN-Zugangspunkt prüfen')});
      this._cards.push(mount('.diagnostic-content',diagnostics));
      this._cards.push(mount('.settings-content',{...config.cards[1],title:t('Battery & charging','Akku & Laden')}));
      if(this._hass.states[`sensor.${prefix}_history_model_status`]) this._cards.push(mount('.settings-content',{
        type:'entities',title:t('30-day battery history','30-Tage-Akkuhistorie'),show_header_toggle:false,entities:[
          {type:'custom:smart-cat-flap-state-row',language,entity:`sensor.${prefix}_history_model_status`,name:t('Learning model','Lernmodell')},
          {type:'custom:smart-cat-flap-state-row',language,entity:`sensor.${prefix}_history_daily_consumption`,name:t('Consumption per measured day','Verbrauch je gemessenem Tag')},
          {type:'custom:smart-cat-flap-state-row',language,entity:`sensor.${prefix}_history_observed_hours`,name:t('Measured battery time','Gemessene Akkuzeit')},
          {type:'custom:smart-cat-flap-state-row',language,entity:`sensor.${prefix}_history_missing_hours`,name:t('Unmeasured time','Ungemessene Zeit')},
        ]}));
      this._cards.push(mount('.tests-content',config.cards[3]));
      this._cards.push(mount('.rfid-content',config.cards[2]));
      if(this._config.reliable_delivery){
        this._cards.push(mount('.night-slot',config.cards.find(c=>c.type==='custom:smart-cat-flap-night-card')));
        this._cards.push(mount('.settings-content',config.cards.find(c=>c.title===t('Battery saving and delivery','Stromsparen und Zustellung'))));
      }
      this.shadowRoot.querySelectorAll('[data-info]').forEach(button=>button.onclick=()=>this.dispatchEvent(new CustomEvent('hass-more-info',{detail:{entityId:this._entity('sensor',button.dataset.info)},bubbles:true,composed:true})));
      this._updateOverview();
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
  _mountLocation(compact){
    const slot=this.shadowRoot.querySelector('.location-slot');if(!slot)return;
    const card=document.createElement('smart-cat-flap-location');card.setConfig({language:this._language,compact,location_entity:this._config.location_entity});card.hass=this._hass;slot.append(card);this._cards.push(card);
  }
  _entity(domain,key){const prefix=this._config.entity_prefix||(this._config.legacy?'katzenklappe':'smart_cat_flap');if(domain==='sensor'&&key==='estimated_runtime'&&this._hass?.states[`sensor.${prefix}_history_runtime`])return `sensor.${prefix}_history_runtime`;return `${domain}.${prefix}_${this._config.legacy?(LEGACY[key]||key):key}`;}
  _reading(domain,key,retain=false){
    const entity=this._entity(domain,key),current=this._hass.states[entity];
    if(!retain)return {state:current,retained:false};
    this._reports=this._reports||{};
    if(!this._reports[entity]){try{this._reports[entity]=JSON.parse(localStorage.getItem(`smart-cat-flap-report:v1:${entity}`));}catch(_){}}
    if(current&&current.state!=='unavailable'){
      const snapshot={state:current.state,last_updated:current.last_updated,attributes:current.attributes};
      if(JSON.stringify(snapshot)!==JSON.stringify(this._reports[entity])){this._reports[entity]=snapshot;try{localStorage.setItem(`smart-cat-flap-report:v1:${entity}`,JSON.stringify(snapshot));}catch(_){}}
    }
    return reportedState(current,this._reports[entity]);
  }
  _updateOverview(){
    if(!this.shadowRoot.querySelector('.dashboard'))return;
    const language=this._language,de=language==='de',t=(en,ger)=>de?ger:en,root=this.shadowRoot;
    const raw=(domain,key)=>this._hass.states[this._entity(domain,key)]?.state;
    const put=(selector,value)=>{root.querySelector(selector).textContent=value;};
    const connection=raw('binary_sensor','connection'),ready=raw('binary_sensor','detection_ready'),test=raw('switch','test_mode')==='on';
    put('.date',new Date().toLocaleDateString(language,{weekday:'long',day:'numeric',month:'long'}));
    put('.status-label',connection==='on'?t('Connected','Verbunden'):t('Radio pause or offline','Funkpause oder offline'));
    put('.hero-title',test?t('Test mode is active.','Testmodus ist aktiv.'):connection!=='on'?t('Currently disconnected.','Gerade nicht verbunden.'):ready==='on'?t('Ready for the next paw.','Bereit für die nächste Pfote.'):t('Checking the flap.','Die Klappe wird geprüft.'));
    put('.hero-copy',test?t('Physical contacts are ignored. Simulated openings are labelled as tests.','Echte Kontakte werden ignoriert. Simulierte Öffnungen sind als Tests gekennzeichnet.'):connection!=='on'?t('The last reported readings stay visible. Connection and controls return when the device reconnects.','Zuletzt gemeldete Werte bleiben sichtbar. Verbindung und Bedienung kehren beim nächsten Kontakt zurück.'):t('A clear view of flap activity, energy and your daily schedule.','Klappenbewegung, Energie und dein Tagesplan auf einen Blick.'));
    put('.ready-tag',ready==='on'?t('Detection ready','Erkennung bereit'):t('Detection status unknown','Erkennungsstatus unbekannt'));
    root.querySelector('.status').style.color=connection==='on'?'var(--cat-accent)':'var(--cat-muted)';
    const interval=raw('number','reporting_interval'),saving=raw('switch','experimental_battery_saving');
    put('.report-tag',raw('sensor','power_source')==='usb'?t('USB · stays connected','USB · bleibt verbunden'):saving==='on'&&Number.isFinite(Number(interval))?`${t('Reporting interval','Meldeintervall')} ${Number(interval)} min`:t('Reporting when connected','Meldung bei Verbindung'));
    const direction=raw('sensor','last_opening_direction');
    const inward=direction==='inside'||direction==='innen',outward=direction==='outside'||direction==='aussen';
    put('.opening-title',inward?t('Opened inward','Nach innen geöffnet'):outward?t('Opened outward','Nach außen geöffnet'):direction==='unclear'||direction==='unklar'?t('Direction unclear','Richtung unklar'):t('No direction reported yet','Noch keine Richtung gemeldet'));
    put('.flow-arrow',inward?'←':outward?'→':'·');
    const prefix=this._config.entity_prefix||(this._config.legacy?'katzenklappe':'smart_cat_flap');
    const event=this._hass.states[`event.${prefix}_${this._config.legacy?'oeffnung':'opening'}`];
    const date=event?.state?new Date(event.state):null;
    put('.opening-date',date&&!Number.isNaN(date.valueOf())?date.toLocaleString(language):t('The next reported opening will appear here.','Die nächste gemeldete Öffnung erscheint hier.'));
    const count=(domain,key)=>{const value=raw(domain,key);return value!==undefined&&value!==null&&value!==''&&Number.isFinite(Number(value))?new Intl.NumberFormat(language,{maximumFractionDigits:0}).format(Number(value)):'—';};
    put('.opening-count',count('sensor','openings_since_restart'));
    put('.pending-count',this._config.reliable_delivery?count('sensor','pending_openings'):'—');
    const retain=Boolean(this._config.reliable_delivery),voltage=this._reading('sensor','battery_voltage',retain),source=this._reading('sensor','power_source',retain),charge=this._reading('sensor','charging_status',retain),runtime=this._reading('sensor','estimated_runtime',retain);
    put('.voltage',formatSensorValue(voltage.state||{state:'unknown'},this._entity('sensor','battery_voltage'),language));
    put('.power-tag',source.state?.state==='usb'?t('USB connected','USB angeschlossen'):source.state?.state==='battery'?t('Battery power','Akkubetrieb'):t('Source unknown','Quelle unbekannt'));
    put('.charge',translateState(charge.state?.state||'unknown',language));
    const charging=charge.state?.state==='charging'&&!charge.retained&&connection==='on';
    root.querySelector('.battery').classList.toggle('is-charging',charging);
    const levelReading=this._reading('sensor','estimated_battery_level',retain),level=batteryLevel(levelReading.state?.state);
    const quality=this._reading('sensor','battery_estimate_quality',retain),qualityState=quality.state?.state,estimateNotice=batteryEstimateNotice(qualityState,language);
    root.querySelector('.battery').classList.toggle('has-level',level!==null&&level>0);
    root.querySelector('.battery').style.setProperty('--battery-color',batteryColor(level));
    root.querySelector('.hero').style.setProperty('--hero-battery-color',batteryColor(level));
    root.querySelector('.battery-level-position').style.transform=`translate(20px,${level===100?17:23+83*(1-(level??0)/100)}px)`;
    root.querySelector('.battery-motion').hidden=false;
    put('.battery-motion',level===null?(estimateNotice||t('Charge level unknown · calibration needed','Ladestand unbekannt · Kalibrierung nötig')):`${new Intl.NumberFormat(language,{maximumFractionDigits:0}).format(level)} % · ${t('estimated charge','geschätzter Ladestand')}`);
    root.querySelector('.battery-bolt').style.opacity=charge.state?.state==='charging'?'1':'.15';
    const historyState=this._hass.states[this._entity('sensor','history_model_status')];
    const learningNotice=batteryHistoryNotice(historyState,language);
    put('.runtime',learningNotice&&historyState?.state!=='partial'?learningNotice:formatSensorValue(runtime.state||{state:'unknown'},this._entity('sensor','estimated_runtime'),language));
    put('.battery-meta .small',historyState?.state==='learning'?t('Consumption is being recorded','Verbrauch wird aufgezeichnet'):t('estimated on battery','geschätzt im Akkubetrieb'));
    const low=raw('binary_sensor','battery_low')==='on';
    const uncertain=qualityState==='uncertain'||historyState?.state==='partial';
    root.querySelector('.battery-warning').hidden=!low&&!uncertain;
    put('.battery-warning',[low?t('Battery low. Please allow it to recharge.','Akku niedrig. Bitte wieder aufladen lassen.'):'',uncertain?t('Estimate uncertain: charging and consumption during measurement gaps are not included. The saved full reference is retained.','Schätzung unsicher: Ladung und Verbrauch während Messlücken sind nicht enthalten. Der Vollpunkt bleibt gespeichert.'):''].filter(Boolean).join(' '));
    const retained=[voltage,source,charge,runtime,levelReading,quality].filter(r=>r.retained);
    const stamps=retained.map(r=>Date.parse(r.state?.last_updated)).filter(Number.isFinite);
    put('.stamp',retained.length?`${t('Last reported','Zuletzt gemeldet')}${stamps.length?' · '+new Date(Math.min(...stamps)).toLocaleString(language):''}`:t('Readings from the device','Messwerte vom Gerät'));
    const diagnostics=root.querySelector('.diagnostics');
    if(test)diagnostics.open=true;
    diagnostics.classList.toggle('test-active',test);
    const photoState=this._hass.states[this._config.cat_photo_entity||'input_text.smart_cat_flap_cat_photo'];
    const photoValid=photoState&&photoState.state!=='unavailable';
    const path=photoValid?catPhotoPath(photoState.state):'';
    const input=root.querySelector('.photo-input');
    if(root.activeElement!==input)input.value=path;
    root.querySelector('.photo-path-save').disabled=!photoValid||Boolean(this._photoUploading);
    root.querySelector('.photo-choose').disabled=!photoValid||Boolean(this._photoUploading);
    if(!photoValid)root.querySelector('.photo-message').textContent=t('The photo helper is not available yet.','Der Foto-Helfer ist noch nicht verfügbar.');
    else if(['The photo helper is not available yet.','Der Foto-Helfer ist noch nicht verfügbar.'].includes(root.querySelector('.photo-message').textContent))root.querySelector('.photo-message').textContent='';
    if(this._photoPath!==path||(path.startsWith('/media/')&&Date.now()-(this._photoSignedAt||0)>3000000))this._showPhoto(path);
  }
  async _showPhoto(path){
    this._photoPath=path;
    const photo=this.shadowRoot.querySelector('.cat-photo'),preview=this.shadowRoot.querySelector('.photo-preview'),illustration=this.shadowRoot.querySelector('.hero svg')||this.shadowRoot.querySelector('.title ha-icon');
    if(!path){photo.hidden=true;if(preview)preview.hidden=true;if(illustration)illustration.style.display='';return;}
    this._photoSignedAt=Date.now();
    try{
      const signed=path.startsWith('/media/')?await this._hass.callWS({type:'auth/sign_path',path,expires:3600}):null;
      // HA may prepare the card before attaching it; loading an image is valid then.
      if(path!==this._photoPath||photo!==this.shadowRoot.querySelector('.cat-photo'))return;
      photo.src=signed?this._hass.hassUrl(signed.path):path;
      photo.hidden=false;if(illustration)illustration.style.display='none';if(preview){preview.src=photo.src;preview.hidden=false;}
    }catch(_){photo.hidden=true;if(preview)preview.hidden=true;if(illustration)illustration.style.display='';const message=this.shadowRoot.querySelector('.photo-message');if(message)message.textContent=this._language==='de'?'Foto konnte nicht geladen werden. Bitte Bildpfad prüfen.':'Could not load the photo. Please check its path.';}
  }
  getCardSize() { return 12; }
  static getStubConfig() { return {language: "auto", entity_prefix: "smart_cat_flap"}; }
}


// Small companion for a home's overview; uses the same reported-state cache.
class SmartCatFlapCompactCard extends SmartCatFlapCard {
  _render(language) {
    const t=(en,de)=>language==='de'?de:en;
    this._cards=[];
    this.shadowRoot.innerHTML=`<style>
      :host{display:block;--cat-accent:#70cfbf;color:var(--primary-text-color)}*{box-sizing:border-box}
      ha-card{border-radius:18px;padding:18px 20px;background:var(--ha-card-background,var(--card-background-color));border:1px solid var(--divider-color);overflow:hidden}
      .top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}h2{font-size:18px;font-weight:600;margin:0;letter-spacing:-.02em}.title{display:flex;align-items:center;gap:8px}.cat-photo{width:28px;height:28px;object-fit:cover;border-radius:9px;border:1px solid var(--cat-accent)}.cat-photo[hidden]{display:none}.title ha-icon{color:var(--cat-accent);--mdc-icon-size:21px}.connection{font-size:10px;display:flex;gap:5px;align-items:center;color:var(--cat-accent)}.dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
      .body{display:grid;grid-template-columns:minmax(0,1fr) 62px auto;align-items:center;gap:12px}.status{max-width:50%;font-size:15px;font-weight:550;line-height:1.4}.direction{max-width:50%}.direction,.charge,.stamp{font-size:11px;color:var(--secondary-text-color);line-height:1.6;margin-top:4px}.percent{font-size:24px;letter-spacing:-.035em;font-weight:600}.voltage{font-size:11px;color:var(--secondary-text-color);margin-top:4px}.battery{width:56px;height:70px;color:var(--battery-color,var(--cat-accent))}.liquid{opacity:0}.has-level .liquid{opacity:1}.wave{fill:var(--battery-color,var(--cat-accent));opacity:.55}.wave.back{opacity:.22}.has-level .wave{animation:cat-compact-wave 3.2s linear infinite}.has-level .wave.back{animation:cat-compact-wave 4.8s linear infinite reverse}.level{transition:transform 1.5s ease}.bottom{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:12px;border-top:1px solid var(--divider-color);padding-top:10px}.charge{margin:0}.runtime{font-size:11px;color:var(--secondary-text-color);line-height:1.5;margin-top:3px}.more{font-size:11px;color:var(--cat-accent);text-decoration:none;padding:3px 0}.stamp:empty{display:none}.warning{color:var(--warning-color,#e7b865)}
      @keyframes cat-compact-wave{from{transform:translateX(0)}to{transform:translateX(-60px)}}@media(prefers-reduced-motion:reduce){.has-level .wave,.has-level .wave.back{animation:none}.level{transition:none}}@media(max-width:340px){ha-card{padding:16px}.body{gap:8px;grid-template-columns:minmax(0,1fr) 46px auto}.battery{width:44px}.connection{font-size:9px}.percent{font-size:21px}}
      </style><ha-card><div class="top"><div class="title"><img class="cat-photo" hidden alt="${t('Your cat','Deine Katze')}"><ha-icon icon="mdi:cat"></ha-icon><h2>${t('Cat flap','Katzenklappe')}</h2></div><span class="connection"><i class="dot"></i><span class="connection-label"></span></span></div><div class="body"><div><div class="status"></div><div class="direction"></div><div class="location-slot"></div></div><svg class="battery" viewBox="0 0 100 120" aria-hidden="true"><rect x="35" y="5" width="30" height="8" rx="4" fill="currentColor"/><rect x="14" y="17" width="72" height="95" rx="17" fill="rgba(112,207,191,.08)" stroke="currentColor" stroke-width="2"/><defs><clipPath id="compact-battery"><rect x="20" y="23" width="60" height="83" rx="12"/></clipPath></defs><g class="liquid" clip-path="url(#compact-battery)"><g class="level"><path class="wave back" d="M-60 0 Q-45 -5 -30 0 T0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 V160 H-60Z"/><path class="wave" d="M-60 0 Q-45 -5 -30 0 T0 0 T30 0 T60 0 T90 0 T120 0 T150 0 T180 0 V160 H-60Z"/></g></g><path class="bolt" d="m54 37-20 31h15l-3 23 22-33H52Z" fill="currentColor"/></svg><div><div class="percent"></div><div class="voltage"></div></div></div><div class="bottom"><div><div class="charge"></div><div class="runtime"></div></div><a class="more" href="/katzenklappe-smart/klappe">${t('Details →','Details →')}</a></div><div class="stamp"></div></ha-card>`;
    this._photoPath=undefined;
    this.shadowRoot.querySelector('.cat-photo').onerror=()=>{this.shadowRoot.querySelector('.cat-photo').hidden=true;this.shadowRoot.querySelector('.title ha-icon').style.display='';};
    this._mountLocation(true);
    const link=this.shadowRoot.querySelector('.more');
    const destination=this._config.dashboard_path||'/katzenklappe-smart/klappe';
    link.setAttribute('href',/^\/(?!\/)/.test(destination)?destination:'/katzenklappe-smart/klappe');
    this._updateOverview();
  }
  _updateOverview() {
    const root=this.shadowRoot;if(!root.querySelector('.body'))return;
    const language=this._language,t=(en,de)=>language==='de'?de:en;
    const raw=(domain,key)=>this._hass.states[this._entity(domain,key)]?.state;
    const put=(selector,text)=>{root.querySelector(selector).textContent=text;};
    const connected=raw('binary_sensor','connection')==='on',test=raw('switch','test_mode')==='on',ready=raw('binary_sensor','detection_ready')==='on';
    put('.connection-label',connected?t('Connected','Verbunden'):t('Radio pause / offline','Funkpause / offline'));
    root.querySelector('.connection').style.color=connected?'var(--cat-accent)':'var(--secondary-text-color)';
    put('.status',test?t('Test mode','Testmodus'):!connected?t('Last reported status','Zuletzt gemeldeter Stand'):ready?t('Detection ready','Erkennung bereit'):t('Checking flap','Klappe wird geprüft'));
    const direction=raw('sensor','last_opening_direction');
    put('.direction',direction==='inside'||direction==='innen'?t('Last opening: inward','Zuletzt nach innen geöffnet'):direction==='outside'||direction==='aussen'?t('Last opening: outward','Zuletzt nach außen geöffnet'):direction==='unclear'||direction==='unklar'?t('Last direction unclear','Letzte Richtung unklar'):t('No opening reported yet','Noch keine Öffnung gemeldet'));
    const voltage=this._reading('sensor','battery_voltage',true),charge=this._reading('sensor','charging_status',true),levelReading=this._reading('sensor','estimated_battery_level',true),source=this._reading('sensor','power_source',true),level=batteryLevel(levelReading.state?.state);
    const runtime=this._reading('sensor','estimated_runtime',true);
    const quality=this._reading('sensor','battery_estimate_quality',true),estimateNotice=batteryEstimateNotice(quality.state?.state,language);
    const charging=connected&&!charge.retained&&charge.state?.state==='charging',card=root.querySelector('ha-card');
    card.classList.toggle('is-charging',charging);card.classList.toggle('has-level',level!==null&&level>0);
    card.style.setProperty('--battery-color',batteryColor(level));
    root.querySelector('.level').style.transform=`translate(20px,${level===100?17:23+83*(1-(level??0)/100)}px)`;
    root.querySelector('.bolt').style.opacity=charging?'1':'.12';
    put('.percent',level===null?'—':`${new Intl.NumberFormat(language,{maximumFractionDigits:0}).format(level)} %`);
    root.querySelector('.percent').title=estimateNotice||t('Estimated charge from full calibration','Geschätzter Ladestand seit Voll-Kalibrierung');
    put('.voltage',formatSensorValue(voltage.state||{state:'unknown'},this._entity('sensor','battery_voltage'),language));
    const power=source.state?.state==='usb'?'USB':source.state?.state==='battery'?t('Battery','Akku'):t('Source unknown','Quelle unbekannt');
    put('.charge',`${power} · ${translateState(charge.state?.state||'unknown',language)}`);
    root.querySelector('.charge').classList.toggle('warning',raw('binary_sensor','battery_low')==='on');
    const historyState=this._hass.states[this._entity('sensor','history_model_status')],learningNotice=batteryHistoryNotice(historyState,language);
    put('.runtime',learningNotice&&historyState?.state!=='partial'?learningNotice:`${t('Estimated runtime','Geschätzte Restlaufzeit')}: ${formatSensorValue(runtime.state||{state:'unknown'},this._entity('sensor','estimated_runtime'),language)}`);
    const retained=[voltage,charge,levelReading,source,quality,runtime].filter(r=>r.retained),times=retained.map(r=>Date.parse(r.state?.last_updated)).filter(Number.isFinite);
    put('.stamp',[estimateNotice,retained.length?`${t('Last reported','Zuletzt gemeldet')}${times.length?' · '+new Date(Math.min(...times)).toLocaleString(language):''}`:''].filter(Boolean).join(' · '));
    const path=catPhotoPath(this._hass.states[this._config.cat_photo_entity||'input_text.smart_cat_flap_cat_photo']?.state);
    if(this._photoPath!==path||(path.startsWith('/media/')&&Date.now()-(this._photoSignedAt||0)>3000000))this._showPhoto(path);
  }
  getCardSize(){return 3;}

  static getStubConfig(){return {language:'auto',entity_prefix:'smart_cat_flap'};}
}

if (!customElements.get("smart-cat-flap-location")) customElements.define("smart-cat-flap-location", SmartCatFlapLocation);
if (!customElements.get("smart-cat-flap-compact-card")) customElements.define("smart-cat-flap-compact-card", SmartCatFlapCompactCard);
if (!customElements.get("smart-cat-flap-state-row")) customElements.define("smart-cat-flap-state-row", SmartCatFlapStateRow);
if (!customElements.get("smart-cat-flap-night-card")) customElements.define("smart-cat-flap-night-card", SmartCatFlapNightCard);
if (!customElements.get("smart-cat-flap-card")) customElements.define("smart-cat-flap-card", SmartCatFlapCard);
window.customCards = window.customCards || [];
if (!window.customCards.some(card => card.type === "smart-cat-flap-card")) window.customCards.push({
  type: "smart-cat-flap-card", name: "Smart Cat Flap", description: "Cat flap controls using your Home Assistant language", preview: false,
});
