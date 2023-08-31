import { ToscaProperty } from '#src/model/property.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_properties(parsed_rule) {
    if (parsed_rule) {
      for (const key in parsed_rule.value) {
        parsed_rule.value[key].tosca?.setName(key);
      }
    }
  },

  exit_property(parsed_rule) {
    const constraints = propertyListofHelper('constraints', false, parsed_rule);
    if (parsed_rule) {
      validateCreateAndRegister(
        ToscaProperty,
        {
          type: parsed_rule.value.type?.value,
          description: parsed_rule.value.description?.value,
          constraints,
          required: parsed_rule.value.required?.value,
          default: (parsed_rule.value.default?.tosca) ? parsed_rule.value.default?.tosca : parsed_rule.value.default?.value,
          status: parsed_rule.value.status?.value,
          metadata: parsed_rule.value.metadata?.tosca,
          entry_schema: parsed_rule.value.entry_schema?.tosca,
          key_schema: parsed_rule.value.key_schema?.tosca,
        },
        parsed_rule,
      );
    }
  },
};
