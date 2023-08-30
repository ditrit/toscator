import listener_helpers from './listener_helpers/listener_helpers.js';
import { ToscaAttributeMapping } from '#src/model/attribute_mapping.js';
import { validateCreateAndRegister } from '#src/models.js';

export default { exit_attributes_mapping, exit_attribute_mapping };

/**
 *
 * @param parsed_rule
 */
function exit_attributes_mapping(parsed_rule) {
  listener_helpers.defMapofHelperSetname(parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_attribute_mapping(parsed_rule) {
  let mapping;
  if (parsed_rule.value instanceof Array) {
    mapping = listener_helpers.defListofHelper(false, parsed_rule);
  } else {
    mapping = listener_helpers.propertyListofHelper('mapping', false, parsed_rule);
  }
  validateCreateAndRegister(ToscaAttributeMapping, { mapping }, parsed_rule);
}
