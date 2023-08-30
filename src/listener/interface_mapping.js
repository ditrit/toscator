import { newToscaInterfaceMapping } from "../model/interface_mapping.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {exit_interfaces_mapping, exit_interface_mapping}

function exit_interfaces_mapping(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
}

function exit_interface_mapping(parsed_rule) {
    for (const operation in parsed_rule.value) {
        newToscaInterfaceMapping({
            operation: operation,
            workflow: parsed_rule.value[operation]?.value
        }, parsed_rule);
    }
}