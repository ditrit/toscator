import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_service_template(parsed_rule) {
        const val = parsed_rule.value;
        const cst = parsed_rule.ctx.prog;

        cst.tosca_definitions_version = val.tosca_definitions_version?.value;
        cst.description = val.description?.value;
        cst.metadata = val.metadata?.tosca;
        cst.repositories = listener_helpers.propertyMapofHelper('repositories', parsed_rule);
        cst.imports = listener_helpers.propertyListofHelper('imports', false, parsed_rule);
        cst.artifact_types = listener_helpers.propertyMapofHelper('artifact_types', parsed_rule);
        cst.data_types = listener_helpers.propertyMapofHelper('data_types', parsed_rule);
        cst.capability_types = listener_helpers.propertyMapofHelper('capability_types', parsed_rule);
        cst.interface_types = listener_helpers.propertyMapofHelper('interface_types', parsed_rule);
        cst.relationship_types = listener_helpers.propertyMapofHelper('relationship_types', parsed_rule);
        cst.node_types = listener_helpers.propertyMapofHelper('node_types', parsed_rule);
        cst.group_types = listener_helpers.propertyMapofHelper('group_types', parsed_rule);
        cst.policy_types = listener_helpers.propertyMapofHelper('policy_types', parsed_rule);
        cst.topology_template = val.topology_template?.tosca;
    }
};
