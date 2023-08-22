import { newToscaInterfaceAssignment } from "../model/interface_assignment.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_interface_assignments(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_interface_assignment(parsed_rule) {
        const inputs = listener_helpers.propertyMapofHelper("inputs", parsed_rule);
        const operations = listener_helpers.propertyMapofHelper("operations", parsed_rule);
        const notifications = listener_helpers.propertyMapofHelper("notifications", parsed_rule);

        newToscaInterfaceAssignment({
            inputs: inputs,
            operations: operations,
            notifications: notifications
        }, parsed_rule);
    }
}