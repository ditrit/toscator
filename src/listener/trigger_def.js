import { newToscaTriggerDef } from "../model/trigger_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {

    exit_trigger_defs(parsed_rule) {
        parsed_rule.tosca = listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_trigger_def(parsed_rule) {
        const action = listener_helpers.propertyListofHelper("action", false, parsed_rule);
        newToscaTriggerDef({
            description: parsed_rule.value.description?.value,
            event: parsed_rule.value.event?.value,
            schedule: parsed_rule.value.schedule?.tosca,
            target_filter: parsed_rule.value.target_filter?.tosca,
            condition: parsed_rule.value.condition?.tosca,
            action: action
        }, parsed_rule);
    },
}