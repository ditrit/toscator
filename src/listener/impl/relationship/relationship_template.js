import { validateCreateAndRegister } from '#src/models.js';
import { ToscaRelationshipTemplate } from '#src/model/relationship/relationship_template.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_relationship_templates(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_relationship_template(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const attributes = propertyMapofHelper('attributes', parsed_rule);
    const interfaces = propertyMapofHelper('interfaces', parsed_rule);

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
