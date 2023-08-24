import { ToscaNodeTemplate } from '../model/node_template.js';
import { ToscaRequirementAssignment } from '../model/requirement_assignment.js';

/**
 * add the concrete node that fits the requirement to the topology template
 * @param {ToscaRequirementAssignment} req = requirement of a node not defined in the topology template
 * @param {Array<String>} list_st = patterns used to substitute
 */
export function substituteRequirementNode(req, list_st) {
}

/**
 * Substitute the abstract node with a concrete node
 * @param {ToscaNodeTemplate} node to substitute
 * @param {Array<String>} list_st = patterns used to substitute
 */
export function nodeFilterSubstitute(cst, node, list_st) {
    // find the concrete node that can substitute the abstract node
    let substitutes = [];
    list_st.forEach(st => {
        const st_substitute = [];
        st.topology_template?.node_templates.forEach(n => {
            if (node.node_filter.passFilter(n)) {
                st_substitute.push({node: n, service_template: st});
            }
        });
        substitutes = substitutes.concat(st_substitute);
    });

    const sub = substitutes[0];

    cst.topology_template.node_templates.set(node.name, sub.node);

    // TO DO: link the node substituting to the other elements.
}
