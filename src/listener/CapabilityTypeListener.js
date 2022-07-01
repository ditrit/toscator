import { ToscaCapabilityType } from "../model/ToscaCapabilityType.js";

export default {
   exit_capability_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setId(
            key,
            parsed_rule,
            "capability_types"
         );
      }
   },

   exit_capability_type(parsed_rule) {
      this.checkCapabilityType(parsed_rule);
      parsed_rule.tosca = new ToscaCapabilityType(
         this.formatCapabilityType(parsed_rule),
         parsed_rule
      );
   },
   formatCapabilityType(parsed_rule) {
      let properties = new Map();
      let attributes = new Map();
      for (const key in parsed_rule.value.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }

      for (const key in parsed_rule.value.attributes?.value) {
         attributes[key] = parsed_rule.value.attributes.value[key].tosca;
      }

      return {
         derived_from: parsed_rule.value.derived_from?.value,
         version: parsed_rule.value.version?.tosca,
         description: parsed_rule.value.description?.tosca,
         metadata: parsed_rule.value.metadata?.tosca,
         properties: properties,
         attributes: attributes,
      };
   },
   checkCapabilityType(parsed_rule) {
      if (parsed_rule.value.derived_from?.value === undefined) {
         parsed_rule.ctx?.typeWarning(
            parsed_rule.value.derived_from,
            "Missing derived_from"
         );
         return false;
      }
      return true;
   },
};
