import { ToscaCapabilityAssignment } from '#src/model/capability_assignment.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_capability_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_capability_assignment(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const attributes = propertyMapofHelper('attributes', parsed_rule);

    validateCreateAndRegister(ToscaCapabilityAssignment, {
      properties,
      attributes,
      occurences: parsed_rule.value.occurences?.value,
    }, parsed_rule);
  },
};
