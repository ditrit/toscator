import { newToscaNotificationImplementation } from "../model/notification_implementation.js";

export default {
    exit_notification_implementation(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule implementation:+++++++++++++++++++++++++++++++++");
        if (typeof parsed_rule.value === "string") {
            newToscaNotificationImplementation({ primary: parsed_rule.value }, parsed_rule);
        } else {
            let dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
            newToscaNotificationImplementation(
                {
                    primary: typeof parsed_rule.value.primary?.value === "string" ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
                    dependencies: dependencies
                },
                parsed_rule
            );
        }
    },
};
