import { validateCreateAndRegister } from '#src/models.js';
import { ToscaSubstitutionMapping } from '#src/model/substitution_mappings.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_substitution_mappings(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const capabilities = propertyMapofHelper('capabilities', parsed_rule);
    const requirements = propertyMapofHelper('requirements', parsed_rule);
    const attributes = propertyMapofHelper('attributes', parsed_rule);
    const interfaces = propertyMapofHelper('interfaces', parsed_rule);

    validateCreateAndRegister(ToscaSubstitutionMapping, {
      node_type: parsed_rule.value.node_type?.value,
      substitution_filter: parsed_rule.value.substitution_filter?.tosca,
      properties,
      capabilities,
      requirements,
      attributes,
      interfaces,

    }, parsed_rule);
  },
};
