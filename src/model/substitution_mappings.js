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
    
    static correctGrammar(node_type) { //should I always give the service_template so that the input is always the same ?
        for (const property in this.properties) {
            if (!node_type.properties.has(property)) {
                return false;
            }
        }
        for (const capability in this.capabilities) {
            if (!node_type.capabilities.has(capability)) {
                return false;
            }
        }
        for (const requirement in this.requirements) {
            if (!node_type.requirements.has(requirement)) {
                return false;
            }
        }
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