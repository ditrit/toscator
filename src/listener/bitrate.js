import { ToscaBitrate } from '#src/model/tosca_bitrate.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_bitrate(parsed_rule) {
    validateCreateAndRegister(
      ToscaBitrate,
      {
        type: 'bitrate',
        value: parsed_rule?.value,
      },
      parsed_rule,
    );
  },
};
