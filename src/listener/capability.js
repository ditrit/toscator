import { newToscaCapability } from "../model/capability.js";

export default {
   exit_capability_defs(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setName(key);
      }
   },

   exit_capability_def(parsed_rule) {
      let type = parsed_rule.value.type ? parsed_rule.value.type.value : null;
      let description = parsed_rule.value.description
         ? parsed_rule.value.description.value
         : null;
      let occurences = parsed_rule.value.occurences
         ? parsed_rule.value.occurences.value
         : null;
      let properties = new Map();
      let attributes = new Map();
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

      newToscaCapability(
         {
            type: type,
            description: description,
            properties: properties,
            attributes: attributes,
            occurences: occurences,
         },
         parsed_rule
      );
   },
};
