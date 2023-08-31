import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_service_template(parsed_rule) {
    const val = parsed_rule.value;
    const cst = parsed_rule.ctx.prog;

    cst.tosca_definitions_version = val.tosca_definitions_version?.value;
    cst.description = val.description?.value;
    cst.metadata = val.metadata?.tosca;
    cst.repositories = propertyMapofHelper('repositories', parsed_rule);
    cst.imports = propertyListofHelper('imports', false, parsed_rule);
    cst.artifact_types = propertyMapofHelper('artifact_types', parsed_rule);
    cst.data_types = propertyMapofHelper('data_types', parsed_rule);
    cst.capability_types = propertyMapofHelper('capability_types', parsed_rule);
    cst.interface_types = propertyMapofHelper('interface_types', parsed_rule);
    cst.relationship_types = propertyMapofHelper('relationship_types', parsed_rule);
    cst.node_types = propertyMapofHelper('node_types', parsed_rule);
    cst.group_types = propertyMapofHelper('group_types', parsed_rule);
    cst.policy_types = propertyMapofHelper('policy_types', parsed_rule);
    cst.topology_template = val.topology_template?.tosca;
  },
};
