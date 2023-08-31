import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTopologyTemplate } from '#src/model/topology_template.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default { exit_topology_template };

/**
 *
 * @param parsed_rule
 */
function exit_topology_template(parsed_rule) {
  const inputs = propertyMapofHelper('inputs', parsed_rule);
  const outputs = propertyMapofHelper('outputs', parsed_rule);
  const node_templates = propertyMapofHelper('node_templates', parsed_rule);
  const relationship_templates = propertyMapofHelper('relationship_templates', parsed_rule);
  const groups = propertyMapofHelper('groups', parsed_rule);
  const policies = propertyListofHelper('policies', true, parsed_rule);

  validateCreateAndRegister(ToscaTopologyTemplate, {
    description: parsed_rule.value.description?.value,
    inputs,
    outputs,
    node_templates,
    relationship_templates,
    groups,
    policies,
    substitution_mappings: parsed_rule.value.substitution_mappings?.tosca,
    // workflows: workflows
  }, parsed_rule);
}
