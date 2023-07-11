import { newToscaNodeType } from "../model/node_type.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
   exit_node_types(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule node_types:+++++++++++++++++++++++++++++++++");
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setId(key, parsed_rule, "node_types");
      }
   },

   exit_node_type(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule node_type:+++++++++++++++++++++++++++++++++");
      const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
      const attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);
      const capabilities = listener_helpers.propertyMapofHelper("capabilities", parsed_rule);
      const artifacts = listener_helpers.propertyMapofHelper("artifacts", parsed_rule);
      const interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);

      newToscaNodeType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            attributes: attributes,
            capabilities: capabilities,
            requirements: parsed_rule.value.requirements?.tosca,
            artifacts: artifacts,
            interfaces: interfaces,
            //workflows: workflows
         },
         parsed_rule
      );
      //console.log(parsed_rule.tosca)
   },
};
