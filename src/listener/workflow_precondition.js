import { validateCreateAndRegister } from '#src/models.js';
import { ToscaWorkflowPrecondition } from '#src/model/workflow_precondition.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';

export default {
  exit_workflow_preconditions(parsed_rule) {
    defListofHelper(false, parsed_rule);
  },

  exit_workflow_precondition(parsed_rule) {
    validateCreateAndRegister(ToscaWorkflowPrecondition, {
      target: parsed_rule.value.target?.value,
      target_relationship: parsed_rule.value.target_realtionship?.value,
      condition: parsed_rule.value.condition?.value,
    }, parsed_rule);
  },
};
