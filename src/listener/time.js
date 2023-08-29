import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTime } from '#src/model/tosca_time.js';

export default {
  exit_time(parsed_rule) {
    validateCreateAndRegister(
      ToscaTime,
      {
        type: 'time',
        value: parsed_rule?.value,
      },
      parsed_rule,
    );
  },
};
