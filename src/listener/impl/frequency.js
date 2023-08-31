import { validateCreateAndRegister } from '#src/models.js';
import { ToscaFrequency } from '#src/model/tosca_frequency.js';

export default {
  exit_frequency(parsed_rule) {
    validateCreateAndRegister(
      ToscaFrequency,
      {
        type: 'frequency',
        value: parsed_rule?.value,
      },
      parsed_rule,
    );
  },
};
