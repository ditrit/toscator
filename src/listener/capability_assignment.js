import { ToscaCapabilityAssignment } from '../model/capability_assignment.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_capability_assignments(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_capability_assignment(parsed_rule) {
    const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
    const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);

    validateCreateAndRegister(ToscaCapabilityAssignment, {
      properties,
      attributes,
      occurences: parsed_rule.value.occurences?.value,
    }, parsed_rule);
  },
};
