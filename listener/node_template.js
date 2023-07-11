import { newToscaNodeTemplate } from "../model/node_template.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_node_templates(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule exit_node_templates:+++++++++++++++++++++++++++++++++");
        parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
    },

    exit_node_template(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule exit_node_template:+++++++++++++++++++++++++++++++++");
        let directives = listener_helpers.propertyListofHelper("directives", false, parsed_rule);
        let properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
        let attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);
        let capabilities = listener_helpers.propertyMapofHelper("capabilities", parsed_rule);
        let requirements = listener_helpers.propertyListofHelper("requirements", true, parsed_rule);
        let interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);
        let artifacts = listener_helpers.propertyMapofHelper("artifacts", parsed_rule);

        newToscaNodeTemplate({
            type: parsed_rule.value.type?.value,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.value,
            directives: directives,
            properties: properties,
            attributes: attributes,
            requirements: requirements,
            capabilities: capabilities,
            interfaces: interfaces,
            artifacts: artifacts,
            node_filter: parsed_rule.value.node_filter?.value,
            copy: parsed_rule.value.copy?.value
        }, parsed_rule)
    }
}