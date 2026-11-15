"""Validate the real full-reference automation against unsafe/invalid readings."""
from pathlib import Path
import unittest
import yaml
from jinja2.nativetypes import NativeEnvironment

AUTOMATION = yaml.safe_load((Path(__file__).parents[1] / 'charge-completion-automation.yaml').read_text(encoding='utf8'))


class ChargeCompletionTests(unittest.TestCase):
    def test_requires_actual_charge_to_idle_transition_and_ten_minutes(self):
        trigger = AUTOMATION['triggers'][0]
        self.assertEqual((trigger['from'], trigger['to'], trigger['for']), ('charging', 'not_charging', '00:10:00'))
        conditions = AUTOMATION['conditions']
        self.assertEqual(conditions[0]['state'], 'on')
        self.assertEqual((conditions[1]['state'], conditions[1]['for']), ('usb', '00:10:00'))
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


if __name__ == '__main__':
    unittest.main()
