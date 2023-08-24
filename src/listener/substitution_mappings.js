import { newToscaSubstitutionMapping } from '../model/substitution_mappings.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_substitution_mappings(parsed_rule) {
        const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
        const capabilities = listener_helpers.propertyMapofHelper('capabilities', parsed_rule);
        const requirements = listener_helpers.propertyMapofHelper('requirements', parsed_rule);
        const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
        const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);

        newToscaSubstitutionMapping({
            node_type: parsed_rule.value.node_type?.value,
            substitution_filter: parsed_rule.value.substitution_filter?.tosca,
            properties: properties,
            capabilities: capabilities,
            requirements: requirements,
            attributes: attributes,
            interfaces: interfaces

        }, parsed_rule);
    }
};