import { ToscaNodeType } from '../model/node_type.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_node_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca.setId(key, parsed_rule, 'node_types');
    }
  },

  exit_node_type(parsed_rule) {
    const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
    const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
    const capabilities = listener_helpers.propertyMapofHelper('capabilities', parsed_rule);
    const artifacts = listener_helpers.propertyMapofHelper('artifacts', parsed_rule);
    const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);

    validateCreateAndRegister(
      ToscaNodeType,
      {
        derived_from: parsed_rule.value.derived_from?.value,
        version: parsed_rule.value.version?.tosca,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        attributes,
        capabilities,
        requirements: parsed_rule.value.requirements?.tosca,
        artifacts,
        interfaces,
        // workflows: workflows
      },
      parsed_rule,
    );
  },
};
