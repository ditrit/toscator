import { newToscaDataType } from "../model/data_type.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
   exit_data_types(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule data_types:+++++++++++++++++++++++++++++++++");
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setId(key, parsed_rule, "data_types");
      }
   },

   exit_data_type(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule data_type:+++++++++++++++++++++++++++++++++");
      const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
      const constraints = listener_helpers.propertyListofHelper("constraints", false, parsed_rule);
      newToscaDataType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            constraints: constraints,
            key_schema: parsed_rule.value.key_schema?.tosca,
            entry_schema: parsed_rule.value.entry_schema?.tosca,
         },
         parsed_rule
      );
      console.log(parsed_rule.tosca)
   },
};
