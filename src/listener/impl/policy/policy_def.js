import { ToscaPolicyDef } from '#src/model/policy/policy_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_policy_defs(parsed_rule) {
    parsed_rule.tosca = defListofHelper(true, parsed_rule);
  },

  exit_policy_def(parsed_rule) {
    for (const policy_name in parsed_rule.value) {
      const properties = propertyMapofHelper('properties', parsed_rule.value[policy_name]);
      const targets = propertyListofHelper('targets', false, parsed_rule.value[policy_name]);
      const triggers = propertyMapofHelper('triggers', parsed_rule.value[policy_name]);

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
