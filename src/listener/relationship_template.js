import { newToscaRelationshipTemplate } from "../model/relationship_template.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_relationship_templates(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_relationship_template(parsed_rule) {
        let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
        let attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);
        let interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);
        
        if (parsed_rule.value.type) {
            newToscaRelationshipTemplate({
                type: parsed_rule.value.type?.value,
                description: parsed_rule.value.description?.value,
                metadata: parsed_rule.value.metadata?.tosca,
                properties: properties,
                attributes: attributes,
                interfaces: interfaces,
            }, parsed_rule);
        } else {
            newToscaRelationshipTemplate({
                copy: parsed_rule.value.copy?.value,
                description: parsed_rule.value.description?.value,
                metadata: parsed_rule.value.metadata?.tosca,
                properties: properties,
                attributes: attributes,
                interfaces: interfaces,
            }, parsed_rule);
        }
    }
}