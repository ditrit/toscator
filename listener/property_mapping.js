import { newToscaPropertyMapping } from "../model/property_mapping.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_properties_mapping(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_property_mapping(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule property_mapping:+++++++++++++++++++++++++++++++++")
        console.log(parsed_rule.value)
        if (parsed_rule.value instanceof Array) {
            console.log('Array')
            newToscaPropertyMapping({
                mapping: listener_helpers.defListofHelper(false, parsed_rule)
                }, parsed_rule);
        } else if (parsed_rule.value instanceof Map) { //can we use parsed_rule.value.type to do the test...?
            console.log('Map')
            newToscaPropertyMapping({
                mapping: listener_helpers.propertyListofHelper("mapping", false, parsed_rule),
                value: parsed_rule.value.value?.value
                }, parsed_rule);
        } else {
            newToscaPropertyMapping({value: parsed_rule.value}, parsed_rule);
        }
        //console.log(parsed_rule.tosca)
    }
}