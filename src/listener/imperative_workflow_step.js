import { ToscaImperativeWorkflowStep } from '../model/imperative_workflow_step.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_imperative_workflow_steps(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_imperative_workflow_step(parsed_rule) {
    const activities = propertyListofHelper('activities', false, parsed_rule);

    const filter = propertyListofHelper('filter', false, parsed_rule);

    const on_success = [];
    if (typeof parsed_rule.value.on_success?.value === 'string') {
      on_success.push(parsed_rule.value.on_success?.value);
    } else {
      for (const step_names in parsed_rule.value.on_success?.value) {
        on_success.push(step_names);
      }
    }

    const on_failure = [];
    if (typeof parsed_rule.value.on_failure?.value === 'string') {
      on_failure.push(parsed_rule.value.on_failure?.value);
    } else {
      for (const step_names in parsed_rule.value.on_failure?.value) {
        on_failure.push(step_names);
      }
    }

    validateCreateAndRegister(ToscaImperativeWorkflowStep, {
      target: parsed_rule.value.target?.value,
      activities,
      target_relationship: parsed_rule.value.target_relationship?.value,
      filter,
      operation_host: parsed_rule.value.operation_host?.value,
      on_success,
      on_failure,
    }, parsed_rule);
  },
};
