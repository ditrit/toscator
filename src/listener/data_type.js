import { newToscaDataType } from "../model/data_type.js";

export default {
   exit_data_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setId(key, parsed_rule, "data_types");
      }
   },

   exit_data_type(parsed_rule) {
      let properties = new Map();
      let constraints = new Map();
      if (parsed_rule.value.properties) {
         for (const key in parsed_rule.value.properties.value) {
            properties[key] = parsed_rule.value.properties.value[key].tosca;
         }
      }
      if (parsed_rule.value.constraints) {
         for (const key in parsed_rule.value.constraints.value) {
            constraints[key] = parsed_rule.value.constraints.value[key].tosca;
         }
      }

      newToscaDataType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.tosca,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            constraints: constraints,
            key_schema: parsed_rule.value.key_schema?.value,
            entry_schema: parsed_rule.value.entry_schema?.value,
         },
         parsed_rule
      );
   },
};
