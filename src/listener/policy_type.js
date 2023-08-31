import { ToscaPolicyType } from '#src/model/policy_type.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_policy_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca.setId(key, parsed_rule, 'policy_types');
    }
  },

  exit_policy_type(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const targets = propertyListofHelper('targets', false, parsed_rule);
    const triggers = propertyListofHelper('triggers', true, parsed_rule);
    validateCreateAndRegister(ToscaPolicyType, {
      derived_from: parsed_rule.value.derived_from?.value,
      version: parsed_rule.value.version?.tosca,
      description: parsed_rule.value.description?.value,
      metadata: parsed_rule.value.metadata?.tosca,
      properties,
      targets,
      triggers,
    }, parsed_rule);
  },
};
