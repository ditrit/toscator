import { newToscaNotificationDef } from "../model/notification_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_notification_defs(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_notification_def(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule notification_def:+++++++++++++++++++++++++++++++++");
        const outputs = listener_helpers.propertyMapofHelper("outputs", parsed_rule);
        newToscaNotificationDef(
            {
                description: parsed_rule.value.description?.value,
                outputs: outputs,
                implementation: parsed_rule.value.implementation?.tosca,
                
            },
            parsed_rule
        );
    },
};