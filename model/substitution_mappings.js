import { ToscaNode } from "./tosca_node.js";

export class ToscaSubstitutionMapping extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.node_type = input.node_type;
        this.substitution_filter = input.substitution_filter;
        this.properties = input.properties;
        this.capabilities = input.capabilities;
        this.requirements = input.requirements;
        this.attributes = input.attributes;
        this.interfaces = input.interfaces;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaSubstitutionMapping(input, source) {
    let res;
    if (ToscaSubstitutionMapping.isValid(input, source)) {
        res = new ToscaSubstitutionMapping(input, source);
    } else {
        res = {};
    }
    return res;
}