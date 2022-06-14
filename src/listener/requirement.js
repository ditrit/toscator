import { newToscaRequirement } from "../model/requirement.js";

export default {
   exit_requirement_defs(parsed_rule) {
      let requirements = [];
      for (const key in parsed_rule.value) {
         const requirement_name = parsed_rule.value[key].tosca.name;
         delete parsed_rule.value[key].tosca.name;
         requirements.push({
            [requirement_name]: parsed_rule.value[key].tosca,
         });
      }
      requirements.source = parsed_rule;
      parsed_rule.tosca = requirements;
   },

   exit_requirement_def(parsed_rule) {
      for (const key in parsed_rule.value) {
         if (typeof parsed_rule.value[key].value === "string") {
            newToscaRequirement(
               { capability: parsed_rule.value[key].value, name: key },
               parsed_rule
            );
         } else {
            newToscaRequirement(
               {
                  capability: parsed_rule.value[key].value.capability?.value,
                  description: parsed_rule.value[key].value.description?.value,
                  node: parsed_rule.value[key].value.node?.value,
                  relationship:
                     parsed_rule.value[key].value.relationship?.value,
                  occurences: parsed_rule.value[key].value.occurences?.value,
                  name: key,
               },
               parsed_rule
            );
         }
      }
   },
};
