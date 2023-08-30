import { newToscaPolicyDef } from "../model/policy_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_policy_defs(parsed_rule) {
        parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
    },

    exit_policy_def(parsed_rule) {
        for (const policy_name in parsed_rule.value) {
            let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule.value[policy_name]);
            let targets = listener_helpers.propertyListofHelper("targets", false, parsed_rule.value[policy_name]);
            let triggers = listener_helpers.propertyMapofHelper("triggers", parsed_rule.value[policy_name]);

            newToscaPolicyDef({
                name: parsed_rule.value[policy_name].value.name?.value,
                type: parsed_rule.value[policy_name].value.type?.value,
                description: parsed_rule.value[policy_name].value.description?.value,
                properties: properties,
                targets: targets,
                triggers: triggers,
                metadata: parsed_rule.value[policy_name].value.metadata?.tosca
            }, parsed_rule);
        }
    }
}