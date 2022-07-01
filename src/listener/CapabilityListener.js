import { ToscaCapability } from "../model/ToscaCapabillity.js";

export default {
   exit_capability_defs(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setName(key);
      }
   },

   exit_capability_def(parsed_rule) {
      if (this.checkCapability(parsed_rule)) {
         parsed_rule.value.tosca = new ToscaCapability(
            this.formatCapability(parsed_rule),
            parsed_rule
         );
      }
   },
   formatCapability(parsed_rule) {
      if (typeof parsed_rule.value === "string") {
         return { type: parsed_rule.value };
      }

      let properties = new Map();
      let attributes = new Map();
      let occurrences = parsed_rule.value.occurrences?.value.map((o) => {
         return o.value;
      });
      for (const key in parsed_rule.value.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }

      for (const key in parsed_rule.value.attributes?.value) {
         attributes[key] = parsed_rule.value.attributes.value[key].tosca;
      }

      return {
         type: parsed_rule.value.type?.value,
         description: parsed_rule.value.description?.value,
         properties: properties,
         attributes: attributes,
         occurences: occurrences,
      };
   },
   checkCapability(parsed_rule) {
      if (
         !(
            typeof parsed_rule.value === "string" ||
            typeof parsed_rule.value?.type?.value === "string"
         )
      ) {
         parsed_rule.ctx?.typeError(
            parsed_rule.current,
            "Incorrect definition for Capability"
         );
         return false;
      }
      return true;
   },
};
