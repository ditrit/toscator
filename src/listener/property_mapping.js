import { ToscaPropertyMapping } from '#src/model/property_mapping.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_properties_mapping(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_property_mapping(parsed_rule) {
    if (parsed_rule.value instanceof Array) {
      validateCreateAndRegister(ToscaPropertyMapping, {
        mapping: defListofHelper(false, parsed_rule),
      }, parsed_rule);
    } else if (parsed_rule.value instanceof Object) {
      validateCreateAndRegister(ToscaPropertyMapping, {
        mapping: propertyListofHelper('mapping', false, parsed_rule),
        value: parsed_rule.value.value?.value,
      }, parsed_rule);
    } else {
      validateCreateAndRegister(ToscaPropertyMapping, { value: parsed_rule.value }, parsed_rule);
    }
  },
};
