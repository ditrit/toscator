import { newToscaRequirementMapping } from "../model/requirement_mapping.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_requirements_mapping(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_requirement_mapping(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule requirement_mapping:+++++++++++++++++++++++++++++++++")
        if (parsed_rule.value instanceof Array) {
            let mapping = listener_helpers.defListofHelper(false, parsed_rule);
            newToscaRequirementMapping({
                mapping: mapping,
            }, parsed_rule);
        } else {
            let mapping = listener_helpers.propertyListofHelper("mapping", false, parsed_rule);
            let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
            let attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);

            newToscaRequirementMapping({
                mapping: mapping,
                properties: properties,
                attributes: attributes
            }, parsed_rule);
        }
    }
}