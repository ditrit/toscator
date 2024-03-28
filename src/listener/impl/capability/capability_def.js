import { ToscaCapabilityDef } from '#src/model/capability/capability_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_capability_defs(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca?.setName(key);
    }
  },

  exit_capability_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaCapabilityDef, { type: parsed_rule.value }, parsed_rule);
    } else {
      const properties = propertyMapofHelper('properties', parsed_rule);
      const attributes = propertyMapofHelper('attributes', parsed_rule);
      const valid_source_types = propertyListofHelper('valid_source_types', false, parsed_rule);
      validateCreateAndRegister(
        ToscaCapabilityDef,
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
