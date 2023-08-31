import { validateCreateAndRegister } from '#src/models.js';
import { ToscaSchemaDef } from '#src/model/schema_def.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_schema_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaSchemaDef, { type: parsed_rule.value }, parsed_rule);
    } else {
      const constraints = propertyListofHelper('constraints', false, parsed_rule);
      validateCreateAndRegister(ToscaSchemaDef, {
        type: parsed_rule.value.type?.value,
        description: parsed_rule.value.description?.value,
        constraints,
        entry_schema: parsed_rule.value.entry_schema?.tosca,
        key_schema: parsed_rule.value.key_schema?.tosca,
      }, parsed_rule);
    }
  },
};
