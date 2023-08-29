import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';
import { ToscaWorkflowPrecondition } from '#src/model/workflow_precondition.js';

export default {
  exit_workflow_preconditions(parsed_rule) {
    listener_helpers.defListofHelper(false, parsed_rule);
  },

  exit_workflow_precondition(parsed_rule) {
    validateCreateAndRegister(ToscaWorkflowPrecondition, {
      target: parsed_rule.value.target?.value,
      target_relationship: parsed_rule.value.target_realtionship?.value,
      condition: parsed_rule.value.condition?.value,
    }, parsed_rule);
  },
};
