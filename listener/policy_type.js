import { newToscaPolicyType } from "../model/policy_type.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_policy_types(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule policy_types:+++++++++++++++++++++++++++++++++");
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca.setId(key, parsed_rule, "policy_types")
        }
    },

    exit_policy_type(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule policy_type:+++++++++++++++++++++++++++++++++");
        const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
        const targets = listener_helpers.propertyListofHelper("targets", false, parsed_rule);
        const triggers = listener_helpers.propertyListofHelper("triggers", true, parsed_rule);
        newToscaPolicyType({
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            targets: targets,
            triggers: triggers
        }, parsed_rule);
    }
}