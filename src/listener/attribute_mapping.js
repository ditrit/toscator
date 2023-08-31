import { ToscaAttributeMapping } from '#src/model/attribute_mapping.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default { exit_attributes_mapping, exit_attribute_mapping };

/**
 *
 * @param parsed_rule
 */
function exit_attributes_mapping(parsed_rule) {
  defMapofHelperSetname(parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_attribute_mapping(parsed_rule) {
  let mapping;
  if (parsed_rule.value instanceof Array) {
    mapping = defListofHelper(false, parsed_rule);
  } else {
    mapping = propertyListofHelper('mapping', false, parsed_rule);
  }
  validateCreateAndRegister(ToscaAttributeMapping, { mapping }, parsed_rule);
}
