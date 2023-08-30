import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';
import { ToscaRelationshipTemplate } from '#src/model/relationship_template.js';

export default {
  exit_relationship_templates(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_relationship_template(parsed_rule) {
    const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
    const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
    const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);

    if (parsed_rule.value.type) {
      validateCreateAndRegister(ToscaRelationshipTemplate, {
        type: parsed_rule.value.type?.value,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        attributes,
        interfaces,
      }, parsed_rule);
    } else {
      validateCreateAndRegister(ToscaRelationshipTemplate, {
        copy: parsed_rule.value.copy?.value,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        attributes,
        interfaces,
      }, parsed_rule);
    }
  },
};
