import { ToscaServiceTemplate } from "../model/service_template.js";
import { nodeFilterSubstitute, substituteRequirementNode } from "./node_filter_substitution.js";
import { mappingSubstitution } from "./mapping_substitution.js";

/**
 * Check if cst has an abstract node and if yes then substitute it using a concrete node from list_st
 * @param {ToscaServiceTemplate} cst = service_template with the abstract node
 * @param {Array<ToscaServiceTemplate>} list_st = patterns to substitute the abstract node
 */
export function substitution(cst, list_st) {
    // Note: Type resolution not implemented yet. We consider it done here and we manipulate strings as if they were the real object
    // TO DO: Recursive substitution
    cst.topology_template?.node_templates?.forEach(node_temp => {

        node_temp.directives?.forEach(directive => {
            if (directive === "substitute" || directive === "substitutable") {
                mappingSubstitution(cst, node_temp, list_st);

            } else if( directive === "select" || directive === "selectable") {
                nodeFilterSubstitute(cst, node_temp, list_st);
            }
        });

        // deal with node_filter in requirement_assignment
        // TO DO: not tested nor finished
        node_temp.requirements?.forEach(req => {
            for (const req_name in req) {
                const req_val = req[req_name]
                if (req_val.node_filter) {
                    const concrete_nodes = substituteRequirementNode(req[req_name], list_st);
                    
                    /**
                     * TO DO: Warning: there may be a name conflict with the new concrete node
                     */
                    cst.topology_template.node_templates.set(concrete_nodes.name, concrete_nodes.tosca);
                    req_val.node_filter = undefined;
                    req_val.node = concrete_nodes.name
                }
            }
        });
    });
}
