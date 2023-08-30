import listener_helpers from './listener_helpers/listener_helpers.js';
import { ToscaPolicyDef } from '#src/model/policy_def.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_policy_defs(parsed_rule) {
    parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
  },

  exit_policy_def(parsed_rule) {
    for (const policy_name in parsed_rule.value) {
      const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule.value[policy_name]);
      const targets = listener_helpers.propertyListofHelper('targets', false, parsed_rule.value[policy_name]);
      const triggers = listener_helpers.propertyMapofHelper('triggers', parsed_rule.value[policy_name]);

      validateCreateAndRegister(ToscaPolicyDef, {
        name: parsed_rule.value[policy_name].value.name?.value,
        type: parsed_rule.value[policy_name].value.type?.value,
        description: parsed_rule.value[policy_name].value.description?.value,
        properties,
        targets,
        triggers,
        metadata: parsed_rule.value[policy_name].value.metadata?.tosca,
      }, parsed_rule);
    }
  },
};
