import { newToscaInterfaceDef } from "../model/interface_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_interface_defs(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule interface_defs:+++++++++++++++++++++++++++++++++");
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_interface_def(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule interface_def:+++++++++++++++++++++++++++++++++");
        const inputs = listener_helpers.propertyMapofHelper("inputs", parsed_rule);
        const notifications = listener_helpers.propertyMapofHelper("notifications", parsed_rule);
        const operations = listener_helpers.propertyMapofHelper("operations", parsed_rule);

        newToscaInterfaceDef({
            type: parsed_rule.value.type?.value,
            inputs: inputs,
            notifications: notifications,
            operations: operations
        }, parsed_rule);
    }
}