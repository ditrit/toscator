import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTopologyTemplate } from '#src/model/topology_template.js';

export default { exit_topology_template };

/**
 *
 * @param parsed_rule
 */
function exit_topology_template(parsed_rule) {
  const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
  const outputs = listener_helpers.propertyMapofHelper('outputs', parsed_rule);
  const node_templates = listener_helpers.propertyMapofHelper('node_templates', parsed_rule);
  const relationship_templates = listener_helpers.propertyMapofHelper('relationship_templates', parsed_rule);
  const groups = listener_helpers.propertyMapofHelper('groups', parsed_rule);
  const policies = listener_helpers.propertyListofHelper('policies', true, parsed_rule);

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
