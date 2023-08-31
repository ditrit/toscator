import { ToscaInterfaceDef } from '../model/interface_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_interface_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_interface_def(parsed_rule) {
    const inputs = propertyMapofHelper('inputs', parsed_rule);
    const notifications = propertyMapofHelper('notifications', parsed_rule);
    const operations = propertyMapofHelper('operations', parsed_rule);

    validateCreateAndRegister(ToscaInterfaceDef, {
      type: parsed_rule.value.type?.value,
      inputs,
      notifications,
      operations,
    }, parsed_rule);
  },
};
