import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTriggerDef } from '#src/model/trigger_def.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {

  exit_trigger_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_trigger_def(parsed_rule) {
    const action = propertyListofHelper('action', false, parsed_rule);
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
