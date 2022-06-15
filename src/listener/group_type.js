import { newToscaGroupType } from "../model/group_type.js";

export default {
   exit_group_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setId(key, parsed_rule, "group_types");
      }
   },

   exit_group_type(parsed_rule) {
      let properties = new Map();
      let capabilities = new Map();
      let requirements = new Map();
      let interfaces = new Map();
      let members = [];
      for (const key in parsed_rule.value.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }
      for (const key in parsed_rule.value.capabilities?.value) {
         capabilities[key] = parsed_rule.value.capabilities.value[key].tosca;
      }
      for (const key in parsed_rule.value.requirements?.value) {
         requirements[key] = parsed_rule.value.requirements.value[key].tosca;
      }
      for (const key in parsed_rule.value.interfaces?.value) {
         interfaces[key] = parsed_rule.value.interfaces.value[key].tosca;
      }
      for (const key in parsed_rule.value.members?.value) {
         members.push(parsed_rule.value.members.value[key].value);
      }

      newToscaGroupType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            capabilities: capabilities,
            requirements: requirements,
            interfaces: interfaces,
            members: members,
         },
         parsed_rule
      );
   },
};
