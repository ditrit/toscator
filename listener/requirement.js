import { newToscaRequirement } from "../model/requirement.js";
import { newToscaCapabilityType } from "../model/capability_type.js";
import capability from "./capability.js";

export default {
   exit_requirement_defs(parsed_rule) {
      let requirements = [];
      parsed_rule.value.map((ele) => requirements.push(ele.tosca));
      requirements.source = parsed_rule;
      parsed_rule.tosca = requirements;
   },

   exit_requirement_def(parsed_rule) {
      for (const key in parsed_rule.value) {
         if (typeof parsed_rule.value[key].value === "string") {
            newToscaRequirement(
               { capability: parsed_rule.value[key].value },
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
               },
               parsed_rule
            );
         }
      }
   },
};
