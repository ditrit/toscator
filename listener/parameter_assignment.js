import { newToscaParameterAssignment } from "../model/parameter_assignment.js";
import { parse } from "../schemas/tosca_1_3.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_parameter_assignment(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule parameter_assignment:+++++++++++++++++++++++++++++++++");
        console.log(parsed_rule.type);
        if (parsed_rule.type === "map") { 
            newToscaParameterAssignment({
                description: parsed_rule.value.description?.value,
                value: (parsed_rule.value.value?.tosca) ? parsed_rule.value.value?.tosca : parsed_rule.value.value?.value,
            }, parsed_rule);
        } else {
            newToscaParameterAssignment({value: (parsed_rule.tosca) ? parsed_rule.tosca : parsed_rule.value}, parsed_rule);
        }
    },

    exit_attribute_assignments(parsed_rule) {
        exit_parameter_assignments(parsed_rule);
    },

    exit_property_assignments(parsed_rule) {
        exit_parameter_assignments(parsed_rule);
    },

    exit_input_assignments(parsed_rule) {
        exit_parameter_assignments(parsed_rule);
    }
}

function exit_parameter_assignments(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
}