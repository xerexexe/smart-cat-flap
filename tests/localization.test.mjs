import assert from 'node:assert/strict';
import test from 'node:test';
globalThis.HTMLElement = class {};
globalThis.customElements = {get: () => true};
globalThis.window = {};
const {languageFor, translateState, buildConfig, formatSensorValue, reportedState, nightWindow, nightDeviceOnline, nightScheduleRequest, catPhotoPath, batteryLevel, catLocation, batteryColor, batteryEstimateNotice, batteryHistoryNotice, SmartCatFlapCard} = await import('../frontend/smart-cat-flap-card.js');

test('queued night schedules require both valid whole hours and a request revision',()=>{
  assert.deepEqual(nightScheduleRequest('{"start":0,"end":23,"revision":"a"}'),{start:0,end:23,revision:'a'});
  for(const value of ['', 'unknown', '{}','null','{"start":24,"end":6,"revision":"a"}','{"start":22.5,"end":6,"revision":"a"}','{"start":22,"end":6}','{"start":"22","end":6,"revision":"a"}']) assert.equal(nightScheduleRequest(value),null);
  assert.equal(buildConfig('de',{legacy:true,reliable_delivery:true}).cards.at(-1).schedule_request_entity,'input_text.smart_cat_flap_night_schedule_request');
});

test('enabled night schedule stays editable online but cached states cannot imply connection',()=>{
  const states={'binary_sensor.cat_connection':{state:'on'},'switch.cat_night_rest':{state:'on'}};
  assert.equal(nightDeviceOnline(states,'cat'),true);
  states['switch.cat_night_rest'].state='off';
  assert.equal(nightDeviceOnline(states,'cat'),true);
  states['switch.cat_night_rest'].state='on';
  states['binary_sensor.cat_connection'].state='off';
  assert.equal(nightDeviceOnline(states,'cat'),false);
  assert.equal(nightDeviceOnline({'binary_sensor.cat_verbindung':{state:'off'},'switch.cat_night_rest':{state:'on'}},'cat','binary_sensor.cat_verbindung'),false);
});

test('history learning is explicit and runtime uses days in both languages',()=>{
  assert.equal(batteryHistoryNotice({state:'learning',attributes:{learning_days:4.8}},'de'),'Lernphase: 4/30 Tage');
  assert.equal(batteryHistoryNotice({state:'learning',attributes:{learning_days:4.8}},'en'),'Learning: 4/30 days');
  assert.match(batteryHistoryNotice({state:'partial'},'de'),/Nachtlücken/);
  assert.equal(batteryHistoryNotice({state:'unknown'},'de'),'Akkuhistorie wird geladen');
  assert.equal(batteryHistoryNotice({state:'ready'},'de'),'');
  assert.match(formatSensorValue({state:'55',attributes:{unit_of_measurement:'h'}},'sensor.katzenklappe_history_runtime','de'),/2.*7/);
});

test('cat photos allow local media and HTTPS without executable or credential-bearing URLs',()=>{
  assert.equal(catPhotoPath('media-source://media_source/local/cat.jpg'),'/media/local/cat.jpg');
  assert.equal(catPhotoPath(' /media/local/cat.png '),'/media/local/cat.png');
  assert.equal(catPhotoPath('/local/cat.jpg'),'/local/cat.jpg');
  assert.equal(catPhotoPath('media-source://media_source/local//cat.jpg'),'/media/local/cat.jpg');
  assert.equal(catPhotoPath('/media/local//cat.jpg'),'/media/local/cat.jpg');
  for(const input of ['javascript:alert(1)','data:image/png;base64,x','https://user:password@example.com/a','unknown','/api/states',null])assert.equal(catPhotoPath(input),'');
});

test('night rest controls use both profile languages and installation prefixes', () => {
  const de = buildConfig('de', {legacy:true, reliable_delivery:true}).cards.at(-1);
  assert.equal(de.type, 'custom:smart-cat-flap-night-card');
  assert.equal(de.language, 'de');
  assert.equal(de.entity_prefix, 'katzenklappe');
  assert.equal(de.test_entity,'switch.katzenklappe_testmodus');
  const en = buildConfig('en', {entity_prefix:'my_cat', reliable_delivery:true,night_timezone:'Europe/London'}).cards.at(-1);
  assert.equal(en.timezone, 'Europe/London');
  assert.equal(en.entity_prefix, 'my_cat');
});

test('night graphic handles midnight, daytime, disabled windows and unavailable settings',()=>{
  assert.deepEqual(nightWindow('22.0','6.0'),{start:22,end:6,hours:8,segments:[[0,6],[22,24]]});
  assert.deepEqual(nightWindow(9,17).segments,[[9,17]]);
  assert.equal(nightWindow(6,6).hours,0);
  assert.deepEqual(nightWindow(22,0).segments,[[22,24]]);
  for(const value of [null,undefined,'','unavailable',24,-1,6.5]) assert.equal(nightWindow(value,6),null);
});

test('sleeping devices retain reported battery values but explicit unknown readings replace them', () => {
  const old = {state:'240.5', last_updated:'2026-10-08T16:00:00Z', attributes:{unit_of_measurement:'h'}};
  assert.deepEqual(reportedState({state:'unavailable'}, old), {state:old, retained:true});
  assert.deepEqual(reportedState({state:'unknown'}, old), {state:{state:'unknown'}, retained:false});
  assert.equal(reportedState({state:'unavailable'}).retained, false);
  assert.equal(buildConfig('en', {reliable_delivery:true}).cards[1].entities[3].retain_last_report, true);
  assert.equal(buildConfig('en').cards[1].entities[3].retain_last_report, false);
});

test('optional delivery controls follow the profile language and preserve legacy IDs', () => {
  const config = buildConfig('de', {legacy:true, reliable_delivery:true});
  const card = config.cards.find(c=>c.title==='Stromsparen und Zustellung');
  assert.equal(card.title, 'Stromsparen und Zustellung');
  assert.equal(card.entities[0].entity, 'switch.katzenklappe_experimental_battery_saving');
  assert.equal(card.entities[2].name, 'Noch nicht bestätigte Öffnungen');
  assert.equal(formatSensorValue({state:'1.0',attributes:{}},card.entities[2].entity,'de'),'1');
  assert.equal(buildConfig('en').cards.some(c=>c.title==='Battery saving and delivery'),false);
});

test('measurement display limits precision in both languages without changing chip IDs or invalid values', () => {
  const display = (raw, unit, language='de', entity='sensor.measurement') =>
    formatSensorValue({state:raw, attributes:{unit_of_measurement:unit}}, entity, language);
  assert.equal(display('339.4','h','de','sensor.katzenklappe_estimated_runtime'),'14 Tage 3 Stunden');
  assert.equal(display('25','h','en','sensor.smart_cat_flap_estimated_runtime'),'1 day 1 hour');
  assert.equal(display('24','h','de','sensor.katzenklappe_estimated_runtime'),'1 Tag 0 Stunden');
  assert.equal(display('23.5','h','de','sensor.katzenklappe_estimated_runtime'),'23,5 h');
  assert.equal(display('48','h','en','sensor.smart_cat_flap_estimated_runtime'),'2 days 0 hours');
  assert.equal(display('unknown','h','de','sensor.katzenklappe_estimated_runtime'),'Unbekannt');
  assert.equal(display('40.0715637207031','h'),'40,1 h');
  assert.equal(display('40.0715637207031','h','en'),'40.1 h');
  assert.equal(display('3.70864009857178','V'),'3,71 V');
  assert.equal(display('3.7','V','en'),'3.70 V');
  assert.equal(display('0.027999999','A'),'0,028 A');
  assert.equal(formatSensorValue({state:'-0.0944',attributes:{unit_of_measurement:'A'}},'sensor.current','de','mA'),'-94 mA');
  assert.equal(formatSensorValue({state:'unknown',attributes:{unit_of_measurement:'A'}},'sensor.current','de','mA'),'Unbekannt');
  assert.equal(display('2000','mAh','en','number.capacity'),'2,000 mAh');
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
  assert.equal(battery.entities.length, 9);
  assert.equal(battery.entities.find(row => row.entity === 'sensor.smart_cat_flap_battery_current').display_unit, 'mA');
  assert.ok(battery.entities.some(row => row.entity === 'sensor.smart_cat_flap_estimated_battery_level'));
  assert.ok(battery.entities.some(row => row.entity === 'number.smart_cat_flap_usable_battery_capacity'));
  assert.equal(battery.entities[1].entity, 'sensor.smart_cat_flap_power_source');
  assert.equal(battery.entities[2].entity, 'sensor.smart_cat_flap_charging_status');
  assert.equal(battery.entities[3].entity, 'sensor.smart_cat_flap_estimated_runtime');
  assert.equal(battery.entities[4].entity, 'sensor.smart_cat_flap_battery_estimate_quality');
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

test('battery level preserves real empty/full endpoints and rejects unknown or out-of-range readings',()=>{
  assert.equal(batteryLevel('0'),0);assert.equal(batteryLevel('100'),100);assert.equal(batteryLevel('37.5'),37.5);
  for(const input of [null,undefined,'','unknown','unavailable','NaN',-1,101])assert.equal(batteryLevel(input),null);
});

test('location accepts only explicit manual/inferred records and leaves missing data unknown',()=>{
 assert.equal(catLocation('{"location":"inside","source":"manual","at":123}').location,'inside');
 assert.equal(catLocation('{"location":"outside","source":"opening","at":124}').source,'opening');
 for(const value of ['unknown','{}','{"location":"inside","source":"manual"}','{"location":"upstairs","source":"opening","at":123}',null])assert.equal(catLocation(value),null);
});

test('battery colours use green above 50, orange from 10 through 50 and red below 10',()=>{
 assert.equal(batteryColor(75),'#63cf8b');assert.equal(batteryColor(100),'#63cf8b');
 assert.equal(batteryColor(50),'#f3a34f');assert.equal(batteryColor(10),'#f3a34f');
 assert.equal(batteryColor(9.9),'#ef6464');assert.equal(batteryColor(0),'#ef6464');
 for(const value of [null,'unknown',-1,101])assert.equal(batteryColor(value),'#70cfbf');
});

test('photo loads even while HA is preparing a card before DOM attachment',async()=>{
 const photo={hidden:true,isConnected:false},preview={hidden:true},illustration={style:{}};
 const nodes={'.cat-photo':photo,'.photo-preview':preview,'.hero svg':illustration};
 const card={shadowRoot:{querySelector:s=>nodes[s]},_hass:{callWS:async()=>({path:'/media/local/cat.jpg?temporary=test'}),hassUrl:path=>path}};
 await SmartCatFlapCard.prototype._showPhoto.call(card,'/media/local/cat.jpg');
 assert.equal(photo.hidden,false);assert.equal(preview.hidden,false);assert.equal(photo.src,'/media/local/cat.jpg?temporary=test');
 assert.equal(illustration.style.display,'none');
});

test('an old image request cannot overwrite a rerendered photo element',async()=>{
 let resolve;const oldPhoto={hidden:true,isConnected:true};let current=oldPhoto;
 const card={shadowRoot:{querySelector:s=>s==='.cat-photo'?current:null},_hass:{callWS:()=>new Promise(r=>resolve=r),hassUrl:path=>path}};
 const pending=SmartCatFlapCard.prototype._showPhoto.call(card,'/media/local/cat.jpg');
 current={hidden:true};resolve({path:'/media/local/cat.jpg?temporary=test'});await pending;
 assert.equal(oldPhoto.src,undefined);assert.equal(current.src,undefined);
});


test('battery quality distinguishes missing initial calibration, interrupted measurement and uncertain retained estimates',()=>{
  assert.equal(batteryEstimateNotice('uncalibrated','de'),'Einmaliger Vollpunkt fehlt');
  assert.equal(batteryEstimateNotice('measurement_unavailable','de'),'Messung unterbrochen · Vollpunkt gespeichert');
  assert.equal(batteryEstimateNotice('uncertain','en'),'Uncertain estimate · measurement gap');
  assert.equal(batteryEstimateNotice('calibrated','de'),'');
  assert.equal(batteryEstimateNotice(undefined,'de'),'');
  assert.equal(translateState('uncertain','de'),'Schätzung nach Messlücke unsicher');
  assert.equal(buildConfig('de',{legacy:true}).cards[1].entities[4].entity,'sensor.katzenklappe_battery_estimate_quality');
});
