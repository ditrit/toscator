import { ToscaRequirementMapping } from '#src/model/requirement_mapping.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_requirements_mapping(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_requirement_mapping(parsed_rule) {
    if (parsed_rule.value instanceof Array) {
      const mapping = defListofHelper(false, parsed_rule);
      validateCreateAndRegister(ToscaRequirementMapping, {
        mapping,
      }, parsed_rule);
    } else {
      const mapping = propertyListofHelper('mapping', false, parsed_rule);
      const properties = propertyMapofHelper('properties', parsed_rule);
      const attributes = propertyMapofHelper('attributes', parsed_rule);

      validateCreateAndRegister(ToscaRequirementMapping, {
        mapping,
        properties,
        attributes,
      }, parsed_rule);
    }
  },
};
