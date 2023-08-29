import { validateCreateAndRegister } from '#src/models.js';
import listener_helpers from '#src/listener/listener_helpers/listener_helpers.js';
import { ToscaOperationAssignment } from '#src/model/operation_assignment.js';

export default {
  exit_operation_assignment(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaOperationAssignment, {
        implementation: parsed_rule.value,
      }, parsed_rule);
    } else {
      const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
      validateCreateAndRegister(ToscaOperationAssignment, {
        description: parsed_rule.value.description?.tosca,
        inputs,
        implementation: parsed_rule.value.implementation?.tosca,
      }, parsed_rule);
    }
  },
};
