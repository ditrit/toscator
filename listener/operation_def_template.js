import { newToscaOperationAssignment } from "../model/operation_assignment.js";

export default {
    exit_operation_assignment(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule operation_assignment:+++++++++++++++++++++++++++++++++");
        // it is weird cause this time, the value of implementation is either a implementation_artifact_name 
        // or an operation_implementation_definition depending on the _oneOf
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
