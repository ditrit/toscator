import { validateCreateAndRegister } from '#src/models.js';
import { ToscaOperationDef } from '#src/model/operation/operation_def.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_operation_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_operation_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaOperationDef, { implementation: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = propertyMapofHelper('inputs', parsed_rule);
      const outputs = propertyMapofHelper('outputs', parsed_rule);
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
