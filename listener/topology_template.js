import { newToscaTopologyTemplate } from "../model/topology_template.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {exit_topology_template}

function exit_topology_template(parsed_rule) {
    const inputs = listener_helpers.propertyMapofHelper("inputs", parsed_rule);
    const outputs = listener_helpers.propertyMapofHelper("outputs", parsed_rule);
    const node_templates = listener_helpers.propertyMapofHelper("node_templates", parsed_rule);
    const relationship_templates = listener_helpers.propertyMapofHelper("relationship_templates", parsed_rule);
    const groups = listener_helpers.propertyMapofHelper("groups", parsed_rule);
    const policies = listener_helpers.propertyListofHelper("policies", true, parsed_rule);

    newToscaTopologyTemplate({
        description: parsed_rule.value.description?.value,
        inputs: inputs,
        outputs: outputs,
        node_templates: node_templates,
        relationship_templates: relationship_templates,
        groups: groups,
        policies: policies,
        substitution_mappings: parsed_rule.value.substitution_mappings?.tosca,
        //workflows: workflows
    }, parsed_rule);
}