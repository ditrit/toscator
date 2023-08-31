import { ToscaNotificationDef } from '#src/model/notification/notification_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_notification_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_notification_def(parsed_rule) {
    const outputs = propertyMapofHelper('outputs', parsed_rule);
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
