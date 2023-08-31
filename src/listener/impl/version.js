import { validateCreateAndRegister } from '#src/models.js';
import { ToscaVersion } from '#src/model/version.js';

export default {
  exit_version(parsed_rule) {
    const version = (parsed_rule?.value) ? parsed_rule.value : '';
    validateCreateAndRegister(ToscaVersion, version, parsed_rule);
  },
};
