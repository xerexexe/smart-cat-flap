"""Validate the real full-reference automation against unsafe/invalid readings."""
from pathlib import Path
import unittest
import yaml
from jinja2.nativetypes import NativeEnvironment

AUTOMATION = yaml.safe_load((Path(__file__).parents[1] / 'charge-completion-automation.yaml').read_text(encoding='utf8'))


class ChargeCompletionTests(unittest.TestCase):
    def test_rechecks_missed_transitions_but_keeps_ten_minute_stability_guards(self):
        trigger = AUTOMATION['triggers'][0]
        self.assertNotIn('from', trigger)
        self.assertEqual((trigger['to'], trigger['for']), ('not_charging', '00:10:00'))
        self.assertTrue(any(t.get('minutes') == '/1' for t in AUTOMATION['triggers']))
        self.assertTrue(any(t.get('event') == 'start' for t in AUTOMATION['triggers']))
        self.assertTrue(any(t.get('entity_id', '').endswith('_connection') for t in AUTOMATION['triggers']))
        self.assertTrue(any(t.get('entity_id', '').endswith('_battery_history_report') and t.get('for') == '00:00:02' for t in AUTOMATION['triggers']))
        conditions = AUTOMATION['conditions']
        self.assertEqual(conditions[0]['state'], 'on')
        self.assertEqual((conditions[1]['state'], conditions[1]['for']), ('usb', '00:10:00'))
        self.assertEqual((conditions[3]['state'], conditions[3]['for']), ('not_charging', '00:01:00'))
        self.assertEqual(AUTOMATION['actions'][0]['action'], 'button.press')
        self.assertTrue(AUTOMATION['actions'][0]['target']['entity_id'].endswith('_confirm_full_battery'))

    def test_recorded_full_endpoint_passes_but_low_voltage_load_and_invalid_data_do_not(self):
        env = NativeEnvironment()
        template = env.from_string(AUTOMATION['conditions'][2]['value_template'])
        def accepts(voltage, current):
            values = {'sensor.smart_cat_flap_battery_voltage': str(voltage), 'sensor.smart_cat_flap_battery_current': str(current)}
            result = template.render(states=lambda key: values[key])
            return result is True or isinstance(result, str) and result.strip() == 'True'
        # Actual endpoint recorded on 2026-11-11 after charge current stopped.
        self.assertTrue(accepts(4.15208, 0.0008))
        self.assertFalse(accepts(3.43, 0.0008))
        self.assertFalse(accepts(4.17, -0.114))
        self.assertFalse(accepts(4.15, 0.084))
        for value in ('unknown', 'unavailable', '', 'nan', 'inf'):
            self.assertFalse(accepts(value, 0))
            self.assertFalse(accepts(4.15, value))

    def test_confirmed_reference_is_not_reset_every_minute(self):
        env = NativeEnvironment()
        template = env.from_string(AUTOMATION['conditions'][4]['value_template'])
        def needed(level, quality):
            values = {'sensor.smart_cat_flap_estimated_battery_level': str(level),
                      'sensor.smart_cat_flap_battery_estimate_quality': quality}
            result = template.render(states=lambda key: values[key], is_state=lambda key, state: values[key] == state)
            return result is True or isinstance(result, str) and result.strip() == 'True'
        self.assertTrue(needed(27.3, 'uncertain'))
        self.assertTrue(needed('unknown', 'uncalibrated'))
        self.assertFalse(needed(100, 'calibrated'))
        self.assertFalse(needed(99.9, 'calibrated'))

    def test_stale_reports_are_rejected_even_if_device_looks_connected(self):
        from types import SimpleNamespace
        env = NativeEnvironment()
        template = env.from_string(AUTOMATION['conditions'][5]['value_template'])
        class States:
            def __call__(self, key):
                return self.state
            def __getitem__(self, key):
                return SimpleNamespace(last_updated=self.timestamp)
        states = States()
        states.state = '{"v":1,"t":123}'
        for age, expected in ((0, True), (29, True), (31, False), (600, False), (-10, False)):
            states.timestamp = 1000 - age
            result = template.render(states=states, now=lambda: 1000, as_timestamp=lambda value, default=0: value)
            self.assertEqual(result is True or isinstance(result, str) and result.strip() == 'True', expected)
        states.state = 'unavailable'
        states.timestamp = 1000
        result = template.render(states=states, now=lambda: 1000, as_timestamp=lambda value, default=0: value)
        self.assertFalse(result is True or isinstance(result, str) and result.strip() == 'True')


if __name__ == '__main__':
    unittest.main()
