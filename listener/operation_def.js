import { newToscaOperationDef } from "../model/operation_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_operation_defs(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_operation_def(parsed_rule) {
        if (typeof parsed_rule.value === "string") {
            newToscaOperationDef({implementation: parsed_rule.value}, parsed_rule);
        } else {
            const inputs = listener_helpers.propertyMapofHelper("inputs", parsed_rule);
            const outputs = listener_helpers.propertyMapofHelper("outputs", parsed_rule);
            newToscaOperationDef(
                {
                    description: parsed_rule.value.description?.value,
                    inputs: inputs,
                    implementation: parsed_rule.value.implementation?.tosca,
                    outputs: outputs
                },
                parsed_rule
            );
        }
    },
};
