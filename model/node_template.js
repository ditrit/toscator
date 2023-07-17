import { ToscaNode } from "./tosca_node.js";

export class ToscaNodeTemplate extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.name = input.name;
        this.type = input.type;
        this.description = input.description;
        this.metadata = input.metadata;
        this.directives= input.directives;
        this.properties = input.properties;
        this.attributes = input.attributes;
        this.requirements = input.requirements;
        this.capabilities = input.capabilities;
        this.interfaces = input.interfaces;
        this.articats = input.articats;
        this.node_filter = input.node_filter;
        this.copy = input.copy;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

    static correctGrammar(node_templates) {
        if (this.copy) {
            if (node_templates[this.copy] && node_templates[this.copy].copy) {
                return false;
            }
        }

    }
}

export function newToscaNodeTemplate(input, source) {
    let res;
    if (ToscaNodeTemplate.isValid(input, source)) {
        res = new ToscaNodeTemplate(input, source);
    } else {
        res = {};
    }
    return res;
}