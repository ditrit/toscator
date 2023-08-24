import { newToscaNodeTemplate } from '../model/node_template.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_node_templates(parsed_rule) {
        parsed_rule.tosca = listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_node_template(parsed_rule) {
        const directives = listener_helpers.propertyListofHelper('directives', false, parsed_rule);
        const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
        const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
        const capabilities = listener_helpers.propertyMapofHelper('capabilities', parsed_rule);
        const requirements = listener_helpers.propertyListofHelper('requirements', true, parsed_rule);
        const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);
        const artifacts = listener_helpers.propertyMapofHelper('artifacts', parsed_rule);

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
            node_filter: parsed_rule.value.node_filter?.tosca,
            copy: parsed_rule.value.copy?.value
        }, parsed_rule);
    }
};