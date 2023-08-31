import { ToscaInterfaceAssignment } from '../model/interface_assignment.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_interface_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_interface_assignment(parsed_rule) {
    const inputs = propertyMapofHelper('inputs', parsed_rule);
    const operations = propertyMapofHelper('operations', parsed_rule);
    const notifications = propertyMapofHelper('notifications', parsed_rule);

    validateCreateAndRegister(ToscaInterfaceAssignment, {
      inputs,
      operations,
      notifications,
    }, parsed_rule);
  },
};
