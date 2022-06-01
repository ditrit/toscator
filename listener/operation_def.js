import { newOperationDef } from "../model/operation_def.js";

export default {
   exit_operation_def(parsed_rule) {
      newOperationDef(
         {
            description: parsed_rule.value.description?.value,
            inputs: parsed_rule.value.inputs?.value,
            implementation: parsed_rule.value.implementation?.value,
         },
         parsed_rule
      );
   },
};
