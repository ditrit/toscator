import { ToscaDataType } from '../model/data_type.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_data_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca?.setId(key, parsed_rule, 'data_types');
    }
  },

  exit_data_type(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const constraints = propertyListofHelper('constraints', false, parsed_rule);
    validateCreateAndRegister(
      ToscaDataType,
      {
        derived_from: parsed_rule.value.derived_from?.value,
        version: parsed_rule.value.version?.tosca,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        constraints,
        key_schema: parsed_rule.value.key_schema?.tosca,
        entry_schema: parsed_rule.value.entry_schema?.tosca,
      },
      parsed_rule,
    );
  },
};
