import { newToscaSubstitutionMapping } from "../model/substitution_mappings.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_substitution_mappings(parsed_rule) {
        let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
        let capabilities = listener_helpers.propertyMapofHelper("capabilities", parsed_rule);
        let requirements = listener_helpers.propertyMapofHelper("requirements", parsed_rule);
        let attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);
        let interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);

        newToscaSubstitutionMapping({
            node_type: parsed_rule.value.node_type?.value,
            substitution_filter: parsed_rule.value.substitution_filter?.value,
            properties: properties,
            capabilities: capabilities,
            requirements: requirements,
            attributes: attributes,
            interfaces: interfaces

        }, parsed_rule);
    }
}