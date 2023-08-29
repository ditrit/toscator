import { newToscaWorkflowActivityInline } from '../model/workflow_activity_inline.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
  exit_workflow_activity_inline(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaWorkflowActivityInline, { workflow: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
      newToscaWorkflowActivityInline({
        workflow: parsed_rule.value.workflow?.value,
        inputs,
      }, parsed_rule);
    }
  },
};
