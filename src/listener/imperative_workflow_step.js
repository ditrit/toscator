import { newToscaImperativeWorkflowStep } from "../model/imperative_workflow_step.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_imperative_workflow_steps(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_imperative_workflow_step(parsed_rule) {
        let activities = listener_helpers.propertyListofHelper("activities", false, parsed_rule);

        let filter = listener_helpers.propertyListofHelper("filter", false, parsed_rule);

        let on_success = [];
        if (typeof parsed_rule.value.on_success?.value == "string") {
            on_success.push(parsed_rule.value.on_success?.value);
        } else {
            for (step_names in parsed_rule.value.on_success?.value) {
                on_success.push(step_names);
            }
        }

        let on_failure = [];
        if (typeof parsed_rule.value.on_failure?.value == "string") {
            on_failure.push(parsed_rule.value.on_failure?.value);
        } else {
            for (step_names in parsed_rule.value.on_failure?.value) {
                on_failure.push(step_names);
            }
        }

        newToscaImperativeWorkflowStep({
            target: parsed_rule.value.target?.value,
            activities: activities,
            target_relationship: parsed_rule.value.target_relationship?.value,
            filter: filter,
            operation_host: parsed_rule.value.operation_host?.value,
            on_success: on_success,
            on_failure: on_failure
        }, parsed_rule)
    }
}