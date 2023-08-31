import { ToscaCapabilityFilter } from '#src/model/capability_filter.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_capabilities_filter(parsed_rule) {
    parsed_rule.tosca = defListofHelper(true, parsed_rule);
  },

  exit_capability_filter(parsed_rule) {
    for (const capability_name in parsed_rule.value) {
      const properties = propertyListofHelper('properties', true, parsed_rule.value[capability_name]);
      validateCreateAndRegister(ToscaCapabilityFilter, {
        name: capability_name,
        properties,
      }, parsed_rule);
    }
  },
};
