import { newToscaNodeType } from "../model/node_type.js";

export default {
   exit_node_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setId(key, parsed_rule, "node_types");
      }
   },

   exit_node_type(parsed_rule) {
      let properties = new Map();
      let attributes = new Map();
      let capabilities = new Map();
      if (parsed_rule.value.properties) {
         for (const key in parsed_rule.value.properties.value) {
            properties[key] = parsed_rule.value.properties.value[key].tosca;
         }
      }
      if (parsed_rule.value.attributes) {
         for (const key in parsed_rule.value.attributes.value) {
            attributes[key] = parsed_rule.value.attributes.value[key].tosca;
         }
      }
      if (parsed_rule.value.capabilities) {
         for (const key in parsed_rule.value.capabilities.value) {
            capabilities[key] = parsed_rule.value.capabilities.value[key].tosca;
         }
      }

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
         },
         parsed_rule
      );
   },
};
