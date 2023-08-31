import { ToscaWorkflowActivityCallOperation } from '#src/model/workflow_activity_call_operation.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_workflow_activity_call_operation(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaWorkflowActivityCallOperation, { operation: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = propertyMapofHelper('inputs', parsed_rule);
      validateCreateAndRegister(ToscaWorkflowActivityCallOperation, {
        operation: parsed_rule.value.operation?.value,
        inputs,
      }, parsed_rule);
    }
  },
};
