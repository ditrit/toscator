import { ToscaNotificationDef } from '../model/notification_def.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_notification_defs(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_notification_def(parsed_rule) {
    const outputs = listener_helpers.propertyMapofHelper('outputs', parsed_rule);
    validateCreateAndRegister(
      ToscaNotificationDef,
      {
        description: parsed_rule.value.description?.value,
        outputs,
        implementation: parsed_rule.value.implementation?.tosca,

      },
      parsed_rule,
    );
  },
};
