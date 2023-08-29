import { newToscaWorkflowActivityCallOperation } from '../model/workflow_activity_call_operation.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
  exit_workflow_activity_call_operation(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaWorkflowActivityCallOperation, { operation: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
      newToscaWorkflowActivityCallOperation({
        operation: parsed_rule.value.operation?.value,
        inputs,
      }, parsed_rule);
    }
  },
};
