import { ToscaNodeTemplate } from '#src/model/node_template.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_node_templates(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_node_template(parsed_rule) {
    const directives = propertyListofHelper('directives', true, parsed_rule);
    const properties = propertyMapofHelper('properties', parsed_rule);
    const attributes = propertyMapofHelper('attributes', parsed_rule);
    const capabilities = propertyMapofHelper('capabilities', parsed_rule);
    const requirements = propertyListofHelper('requirements', true, parsed_rule);
    const interfaces = propertyMapofHelper('interfaces', parsed_rule);
    const artifacts = propertyMapofHelper('artifacts', parsed_rule);

    validateCreateAndRegister(ToscaNodeTemplate, {
      type: parsed_rule.value.type?.value,
      description: parsed_rule.value.description?.value,
      metadata: parsed_rule.value.metadata?.value,
      directives,
      properties,
      attributes,
      requirements,
      capabilities,
      interfaces,
      artifacts,
      node_filter: parsed_rule.value.node_filter?.tosca,
      copy: parsed_rule.value.copy?.value,
    }, parsed_rule);
  },
};
