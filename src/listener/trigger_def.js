import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTriggerDef } from '#src/model/trigger_def.js';

export default {

  exit_trigger_defs(parsed_rule) {
    parsed_rule.tosca = listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_trigger_def(parsed_rule) {
    const action = listener_helpers.propertyListofHelper('action', false, parsed_rule);
    validateCreateAndRegister(ToscaTriggerDef, {
      description: parsed_rule.value.description?.value,
      event: parsed_rule.value.event?.value,
      schedule: parsed_rule.value.schedule?.tosca,
      target_filter: parsed_rule.value.target_filter?.tosca,
      condition: parsed_rule.value.condition?.tosca,
      action,
    }, parsed_rule);
  },
};
