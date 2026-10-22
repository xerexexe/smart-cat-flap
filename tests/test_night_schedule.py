"""Render the real automation guards for invalid requests and stale acknowledgements.

Requires PyYAML and Jinja2, also supplied with an ESPHome development environment.
"""
import json
from pathlib import Path
import unittest
import yaml
from jinja2.nativetypes import NativeEnvironment

AUTOMATION = yaml.safe_load((Path(__file__).parents[1] / 'night-schedule-automation.yaml').read_text(encoding='utf8'))


class NightScheduleTests(unittest.TestCase):
    def setUp(self):
        self.states = {'binary_sensor.smart_cat_flap_connection': 'on',
                       'number.smart_cat_flap_night_rest_start_hour': '22.0',
                       'number.smart_cat_flap_night_rest_end_hour': '6.0'}
        self.request = {'start': 22, 'end': 6, 'revision': 'first'}
        self.raw = json.dumps(self.request)
        self.states['input_text.smart_cat_flap_night_schedule_request'] = self.raw
        self.env = NativeEnvironment()
        def from_json(value, default):
            try:
                return json.loads(value)
            except (ValueError, TypeError):
                return default
        def to_float(value, default=0):
            try:
                return float(value)
            except (ValueError, TypeError):
                return default
        self.env.filters.update(from_json=from_json, float=to_float)
        self.env.globals.update(states=lambda e: self.states.get(e, 'unknown'),
                                is_state=lambda e, s: self.states.get(e) == s)

    def render(self, template):
        result = self.env.from_string(template).render(request=self.request, queued=self.raw)
        return result if isinstance(result, bool) else result.strip() == 'True'

    def test_invalid_requests_never_reach_device_actions(self):
        guard = AUTOMATION['conditions'][1]['value_template']
        self.assertTrue(self.render(guard))
        for value in ('unknown', '{}', 'null', '[]', '{"start":true,"end":6,"revision":"a"}',
                      '{"start":24,"end":6,"revision":"a"}', '{"start":22,"end":6,"revision":""}'):
            self.states['input_text.smart_cat_flap_night_schedule_request'] = value
            self.assertFalse(self.render(guard), value)

    def test_ack_requires_connected_device_and_both_matching_hours(self):
        guard = next(a['wait_template'] for a in AUTOMATION['actions'] if 'wait_template' in a)
        self.assertTrue(self.render(guard))
        self.states['number.smart_cat_flap_night_rest_end_hour'] = '7.0'
        self.assertFalse(self.render(guard))
        self.states['number.smart_cat_flap_night_rest_end_hour'] = 'unavailable'
        self.assertFalse(self.render(guard))
        self.states['number.smart_cat_flap_night_rest_end_hour'] = '6.0'
        self.states['binary_sensor.smart_cat_flap_connection'] = 'off'
        self.assertFalse(self.render(guard))

    def test_old_transfer_cannot_clear_new_request(self):
        guard = AUTOMATION['actions'][-2]['value_template']
        self.assertTrue(self.render(guard))
        self.states['input_text.smart_cat_flap_night_schedule_request'] = json.dumps({**self.request, 'revision': 'newer'})
        self.assertFalse(self.render(guard))


if __name__ == '__main__':
    unittest.main()
