import { ToscaGroupType } from '../model/group_type.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_group_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca?.setId(key, parsed_rule, 'group_types');
    }
  },

  exit_group_type(parsed_rule) {
    const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
    const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
    const members = listener_helpers.propertyListofHelper('members', false, parsed_rule);

    validateCreateAndRegister(
      ToscaGroupType,
      {
        derived_from: parsed_rule.value.derived_from?.value,
        version: parsed_rule.value.version?.tosca,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        attributes,
        members,
      },
      parsed_rule,
    );
  },
};
