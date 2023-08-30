import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';
import { ToscaOperationDef } from '#src/model/operation_def.js';

export default {
  exit_operation_defs(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_operation_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaOperationDef, { implementation: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
      const outputs = listener_helpers.propertyMapofHelper('outputs', parsed_rule);
      validateCreateAndRegister(
        ToscaOperationDef,
        {
          description: parsed_rule.value.description?.value,
          inputs,
          implementation: parsed_rule.value.implementation?.tosca,
          outputs,
        },
        parsed_rule,
      );
    }
  },
};
