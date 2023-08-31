import { validateCreateAndRegister } from '#src/models.js';
import { ToscaWorkflowActivityInline } from '#src/model/workflow/workflow_activity_inline.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_workflow_activity_inline(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaWorkflowActivityInline, { workflow: parsed_rule.value }, parsed_rule);
    } else {
      const inputs = propertyMapofHelper('inputs', parsed_rule);
      validateCreateAndRegister(ToscaWorkflowActivityInline, {
        workflow: parsed_rule.value.workflow?.value,
        inputs,
      }, parsed_rule);
    }
  },
};
