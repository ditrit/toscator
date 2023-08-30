import { validateCreateAndRegister } from '#src/models.js';
import { ToscaSize } from '#src/model/tosca_size.js';

export default {
  exit_size(parsed_rule) {
    validateCreateAndRegister(
      ToscaSize,
      {
        type: 'size',
        value: parsed_rule?.value,
      },
      parsed_rule,
    );
  },
};
