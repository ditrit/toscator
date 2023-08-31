import { ToscaImperativeWorkflowDef } from '#src/model/imperative_workflow_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_imperative_workflow_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_imperative_workflow_def(parsed_rule) {
    const inputs = propertyMapofHelper('input', parsed_rule);
    const preconditions = propertyListofHelper('preconditions', false, parsed_rule);
    const steps = propertyMapofHelper('steps', parsed_rule);
    const outputs = propertyMapofHelper('outputs', parsed_rule);
    validateCreateAndRegister(ToscaImperativeWorkflowDef, {
      description: parsed_rule.value.description?.value,
      metadata: parsed_rule.value.metadata?.value,
      inputs,
      precondition: preconditions,
      steps,
      implementation: parsed_rule.value.implementation?.value,
      outputs,
    }, parsed_rule);
  },
};
