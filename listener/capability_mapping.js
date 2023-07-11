import { newToscaCapabilityMapping } from "../model/capability_mapping.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_capabilities_mapping(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_capability_mapping(parsed_rule) {
        if (typeof parsed_rule.value === "array") {
            let mapping = listener_helpers.defListofHelper(false, parsed_rule);
            newToscaCapabilityMapping({
                mapping: mapping,
            }, parsed_rule);
        } else {
            let mapping = listener_helpers.propertyListofHelper("mapping", false, parsed_rule);
            let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
            let attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);

            newToscaCapabilityMapping({
                mapping: mapping,
                properties: properties,
                attributes: attributes
            }, parsed_rule);
        }

    }
}