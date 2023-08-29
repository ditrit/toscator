import { ToscaCapability } from '../model/capability.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_capability_defs(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca?.setName(key);
    }
  },

  exit_capability_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaCapability, { type: parsed_rule.value }, parsed_rule);
    } else {
      const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
      const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
      const valid_source_types = listener_helpers.propertyListofHelper('valid_source_types', false, parsed_rule);
      validateCreateAndRegister(
        ToscaCapability,
        {
          type: parsed_rule.value.type?.value,
          description: parsed_rule.value.description?.value,
          properties,
          attributes,
          valid_source_types,
          occurrences: parsed_rule.value.occurrences?.value,
        },
        parsed_rule,
      );
    }
  },
};
