import { ToscaNode } from "./tosca_node.js";

export class ToscaTopologyTemplate extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.description = input.description;
        this.inputs = input.inputs;
        this.outputs = input.outputs;
        this.node_templates = input.node_templates;
        this.relationship_templates = input.relationship_templates;
        this.groups = input.groups;
        this.policies = input.policies;
        this.substitution_mappings = input.substitution_mappings;
        //this.workflows = input.workflows;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

    setName(name) {
        this.name = name;
    }
}

export function newToscaTopologyTemplate(input, source) {
    let res;
    if (ToscaTopologyTemplate.isValid(input, source)) {
        res = new ToscaTopologyTemplate(input, source);
    } else {
        res = {};
    }
    return res;
}