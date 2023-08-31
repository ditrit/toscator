import { validateCreateAndRegister } from '#src/models.js';
import { ToscaWorkflowActivity } from '#src/model/workflow/workflow_activity.js';
import { defListofHelper } from '#src/listener/listener_helpers/def_listof_helper.js';

export default { exit_workflow_activities, exit_workflow_activity };

/**
 *
 * @param parsed_rule
 */
function exit_workflow_activities(parsed_rule) {
  parsed_rule.tosca = defListofHelper(false, parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_workflow_activity(parsed_rule) {
  validateCreateAndRegister(ToscaWorkflowActivity, {
    delegate: parsed_rule.value.delegate?.tosca,
    set_state: parsed_rule.value.set_state?.value,
    call_operation: parsed_rule.value.call_operation?.tosca,
    inline: parsed_rule.value.inline?.tosca,
  }, parsed_rule);
}
