import { newToscaCapability } from "../model/capability.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";
// import exit_capability_type from "./capability_type.js";
// import deal_deftype from "./def_type.js";

export default {
   exit_capability_defs(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule capability_defs:+++++++++++++++++++++++++++++++++");
      //console.log(parsed_rule);
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setName(key);
      }
   },

   exit_capability_def(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule capability_def:+++++++++++++++++++++++++++++++++");
      if (typeof parsed_rule.value === "string") {
         newToscaCapability({type: parsed_rule.value}, parsed_rule);
      } else {
         const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
         const attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);
         const valid_source_types = listener_helpers.propertyListofHelper("valid_source_types", false, parsed_rule);
         newToscaCapability(
            {
               type: parsed_rule.value.type?.value,
               description: parsed_rule.value.description?.value,
               properties: properties,
               attributes: attributes,
               valid_source_types: valid_source_types,
               occurrences: parsed_rule.value.occurrences?.value
            },
            parsed_rule
         );
      }
   },
};
