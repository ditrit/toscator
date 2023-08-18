import { newToscaCapabilityFilter } from "../model/capability_filter.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_capabilities_filter(parsed_rule) {
        parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
    },

    exit_capability_filter(parsed_rule) {
        for (const capability_name in parsed_rule.value) {
            let properties = listener_helpers.propertyListofHelper("properties", true, parsed_rule.value[capability_name]);
            newToscaCapabilityFilter({
                name: capability_name,
                properties: properties
            }, parsed_rule);  
        }
    }
}