import { newToscaImperativeWorkflowDef } from '../model/imperative_workflow_def.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_imperative_workflow_defs(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_imperative_workflow_def(parsed_rule) {
        const inputs = listener_helpers.propertyMapofHelper('input', parsed_rule);
        const preconditions = listener_helpers.propertyListofHelper('preconditions', false, parsed_rule);
        const steps = listener_helpers.propertyMapofHelper('steps', parsed_rule);
        const outputs = listener_helpers.propertyMapofHelper('outputs', parsed_rule);
        newToscaImperativeWorkflowDef({
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.value,
            inputs: inputs,
            precondition: preconditions,
            steps: steps,
            implementation: parsed_rule.value.implementation?.value,
            outputs: outputs
        }, parsed_rule);
    }
};