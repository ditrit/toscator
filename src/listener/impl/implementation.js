import { ToscaImplementation } from '#src/model/implementation.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_implementation(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaImplementation, { primary: parsed_rule.value }, parsed_rule);
    } else {
      const dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
      validateCreateAndRegister(
        ToscaImplementation,
        {
          primary: typeof parsed_rule.value.primary?.value === 'string' ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
          dependencies,
        },
        parsed_rule,
      );
    }
  },
};
