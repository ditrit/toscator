import { newToscaOperationAssignment } from "../model/operation_assignment.js";

export default {
    exit_operation_assignment(parsed_rule) {
        if (typeof parsed_rule.value === "string") {
            newToscaOperationAssignment({
                implementation: parsed_rule.value
            }, parsed_rule);
        } else {
            const inputs = listener_helpers.propertyMapofHelper("inputs", parsed_rule);
            newToscaOperationAssignment({
                description: parsed_rule.value.description?.tosca,
                inputs: inputs,
                implementation: parsed_rule.value.implementation?.tosca,
            }, parsed_rule);
        }
    }
}
