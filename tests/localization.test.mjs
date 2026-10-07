import assert from 'node:assert/strict';
import test from 'node:test';
globalThis.HTMLElement = class {};
globalThis.customElements = {get: () => true};
globalThis.window = {};
const {languageFor, translateState, buildConfig, formatSensorValue} = await import('../frontend/smart-cat-flap-card.js');

test('measurement display limits precision in both languages without changing chip IDs or invalid values', () => {
  const display = (raw, unit, language='de', entity='sensor.measurement') =>
    formatSensorValue({state:raw, attributes:{unit_of_measurement:unit}}, entity, language);
  assert.equal(display('40.0715637207031','h'),'40,1 h');
  assert.equal(display('40.0715637207031','h','en'),'40.1 h');
  assert.equal(display('3.70864009857178','V'),'3,71 V');
  assert.equal(display('3.7','V','en'),'3.70 V');
  assert.equal(display('0.027999999','A'),'0,028 A');
  assert.equal(display('2000.0001','mAh','en'),'2,000 mAh');
  assert.equal(display('79.999999','%'),'80 %');
  assert.equal(display('12.0',undefined,'de','sensor.katzenklappe_testoeffnungen_seit_neustart'),'12');
  for (const raw of ['NaN','Infinity','']) assert.equal(display(raw,'h'),'Unbekannt');
  assert.equal(display('unknown','V'),'Unbekannt');
  assert.equal(display('unavailable','h','en'),'Unavailable');
  assert.equal(display('000123456789012',undefined,'de','text.cat_chip_id'),'000123456789012');
  assert.equal(display('2026-10-07T15:20:00Z',undefined,'en','event.opening'),'2026-10-07T15:20:00Z');
});

test('profile language wins; German regions work and unsupported languages fall back to English', () => {
  assert.equal(languageFor({locale:{language:'de-CH'},language:'en'}),'de');
  assert.equal(languageFor({language:'de'}),'de');
  assert.equal(languageFor({language:'fr'}),'en');
  assert.equal(languageFor({language:'de'},'en'),'en');
});

test('German and English firmware states render in either language', () => {
  assert.equal(translateState('innen','en'),'Inside');
  assert.equal(translateState('outside','de'),'Außen');
  assert.equal(translateState('fremder Chip','en'),'Unknown chip');
  assert.equal(translateState('invalid reading','de'),'Ungültiger Messwert');
  assert.equal(translateState('unknown','de'),'Unbekannt');
  assert.equal(translateState('4.0','de'),'4.0');
});

test('localization preserves control targets and raw conditional states', () => {
  const en = buildConfig('en'), de = buildConfig('de');
  const collect = obj => {
    if (Array.isArray(obj)) return obj.flatMap(collect);
    if (!obj || typeof obj !== 'object') return [];
    return [...(obj.entity ? [obj.entity] : []), ...Object.values(obj).flatMap(collect)];
  };
  assert.deepEqual(collect(en),collect(de));
  assert.deepEqual(en.cards[3].conditions,de.cards[3].conditions);
  assert.equal(de.cards[3].conditions[0].state,'on');
  assert.equal(de.cards[1].title,'Akku');
  assert.ok(de.cards[1].entities.every(row => row.missing_is_unknown));
  assert.equal(de.cards[0].title,'Katzenklappe');
  assert.equal(en.cards[0].title,'Smart Cat Flap');
});

test('battery status uses real optional signals and keeps absent measurements unknown', () => {
  const battery = buildConfig('en').cards[1];
  assert.equal(battery.entities.length, 5);
  assert.equal(battery.entities[1].entity, 'sensor.smart_cat_flap_power_source');
  assert.equal(battery.entities[2].entity, 'sensor.smart_cat_flap_charging_status');
  assert.equal(battery.entities[3].entity, 'sensor.smart_cat_flap_estimated_runtime');
  assert.ok(battery.entities.every(row => row.type === 'custom:smart-cat-flap-state-row'));
  assert.equal(buildConfig('de', {legacy: true}).cards[1].entities[0].entity,
    'sensor.katzenklappe_akkuspannung');
});

test('legacy German installation maps its controls and keeps real/test data separate', () => {
  const config = buildConfig('de',{legacy:true,entity_prefix:'katzenklappe'});
  assert.equal(config.cards[0].entities[4].entity,'switch.katzenklappe_testmodus');
  assert.equal(config.cards[3].card.cards[1].entities[0].entity,'switch.katzenklappe_testkontakt_innen');
  assert.equal(config.cards[2].card.entities[0].entity,'sensor.katzenklappe_rfid_zuordnung');
  assert.equal(config.cards[3].card.cards[2].entities[3].entity,'sensor.katzenklappe_rfid_teststatus');
  assert.throws(() => buildConfig('en',{entity_prefix:'invalid.prefix'}));
});
