import { newToscaImplentation } from "../model/implementation.js";

export default {
    exit_implementation(parsed_rule) {
        if (typeof parsed_rule.value === "string") {
            newToscaImplentation({ primary: parsed_rule.value }, parsed_rule);
        } else {
            let dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
            newToscaImplentation(
                {
                    primary: typeof parsed_rule.value.primary?.value === "string" ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
                    dependencies
                },
                parsed_rule
            );
        }
    },
};
