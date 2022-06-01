import { newToscaInterfaceType } from "../model/interface_type.js";

export default {
   exit_interface_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setId(
            key,
            parsed_rule,
            "interface_types"
         );
      }
   },

   exit_interface_type(parsed_rule) {
      let inputs = {};
      // let operations = {};
      // for (const key in parsed_rule.value){}
      for (const key in parsed_rule.value.inputs.value) {
         inputs[key] = parsed_rule.value.inputs.value[key].tosca;
         // inputs.push(parsed_rule.value.inputs.value[key].tosca);
      }
      newToscaInterfaceType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            inputs: inputs,
         },
         parsed_rule
      );
   },
};
