import { newToscaNodeFilter } from "../model/node_filter.js"
import listener_helpers from "./listener_helpers/listener_helpers.js"

export default {
    exit_node_filter(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule node_filter:+++++++++++++++++++++++++++++++++");
        //console.log(parsed_rule.value.capabilities.value)
        let properties = listener_helpers.propertyListofHelper("properties", true, parsed_rule); 
        let capabilities = listener_helpers.propertyListofHelper("capabilities", true, parsed_rule);
        newToscaNodeFilter({
            properties: properties,
            capabilities: capabilities
        }, parsed_rule)
    }
}