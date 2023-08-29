import { ToscaPropertyMapping } from '../model/property_mapping.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_properties_mapping(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_property_mapping(parsed_rule) {
    if (parsed_rule.value instanceof Array) {
      validateCreateAndRegister(ToscaPropertyMapping, {
        mapping: listener_helpers.defListofHelper(false, parsed_rule),
      }, parsed_rule);
    } else if (parsed_rule.value instanceof Object) {
      validateCreateAndRegister(ToscaPropertyMapping, {
        mapping: listener_helpers.propertyListofHelper('mapping', false, parsed_rule),
        value: parsed_rule.value.value?.value,
      }, parsed_rule);
    } else {
      validateCreateAndRegister(ToscaPropertyMapping, { value: parsed_rule.value }, parsed_rule);
    }
  },
};
