import { newToscaRelationshipType } from '../model/relationship_type.js';
import attribute from './attribute.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_relationship_types(parsed_rule) {
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca.setId(key, parsed_rule, 'relationship_types');
        }
    },

    exit_relationship_type(parsed_rule) {
        const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
        const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
        const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);
        const valid_target_types = listener_helpers.propertyListofHelper('valid_target_types', false, parsed_rule);
        newToscaRelationshipType({
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            attributes: attributes,
            interfaces: interfaces,
            valid_target_types: valid_target_types
            //workflows, workflows
        }, parsed_rule);
    }
};