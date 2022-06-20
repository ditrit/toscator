import { ToscaNode } from "./tosca_node.js";

export class TopologyTemplate extends ToscaNode {
    constructor(input, source) {
        super(input, source);
        this.description = input.description;
        // this.inputs = input.inputs;
        // this.outputs = input.outputs;
        // this.node_templates = input.node_templates;
        // this.relationship_templates = input.relationship_templates;
        // this.groups = input.groups
        // this.policies = input.policies
        // this.substitution_mappings = input.substitution_mappings;
        // this.workflows = input.workflows;
    }
}
