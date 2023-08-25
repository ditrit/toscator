import { newToscaNotificationImplementation } from '../model/notification_implementation.js';

export default {
    exit_notification_implementation(parsed_rule) {
        if (typeof parsed_rule.value === 'string') {
            newToscaNotificationImplementation({ primary: parsed_rule.value }, parsed_rule);
        } else {
            const dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
            newToscaNotificationImplementation(
                {
                    primary: typeof parsed_rule.value.primary?.value === 'string' ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
                    dependencies: dependencies
                },
                parsed_rule
            );
        }
    },
};