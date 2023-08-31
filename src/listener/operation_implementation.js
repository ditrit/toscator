import { ToscaOperationImplementation } from '#src/model/operation_implementation.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_operation_implementation(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaOperationImplementation, { primary: parsed_rule.value }, parsed_rule);
    } else {
      const dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
      validateCreateAndRegister(
        ToscaOperationImplementation,
        {
          primary: typeof parsed_rule.value.primary?.value === 'string' ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
          dependencies,
          timeout: parsed_rule.value.timeout?.value,
          operation_host: parsed_rule.value.operation_host?.value,

        },
        parsed_rule,
      );
    }
  },
};
