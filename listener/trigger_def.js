import { newToscaTriggerDef } from "../model/trigger_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {

    exit_trigger_defs(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule trigger_defs:+++++++++++++++++++++++++++++++++");
        parsed_rule.tosca = listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_trigger_def(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule trigger_def:+++++++++++++++++++++++++++++++++");
        for (const trigger_name in parsed_rule.value) {
            const action = listener_helpers.propertyListofHelper("action", false, parsed_rule.value[trigger_name]);
            newToscaTriggerDef({
                name: trigger_name,
                description: parsed_rule.value[trigger_name].value.description?.value,
                event: parsed_rule.value[trigger_name].value.event?.value,
                schedule: parsed_rule.value[trigger_name].value.schedule?.tosca,
                target_filter: parsed_rule.value[trigger_name].value.target_filter?.tosca,
                condition: parsed_rule.value[trigger_name].value.condition?.tosca,
                action: action
            }, parsed_rule);
        }
    },
}