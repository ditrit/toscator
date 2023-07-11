import { ToscaNode } from "./tosca_node.js";

export class ToscaCapabilityFilter extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.name = input.name;
        this.properties = input.properties;
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

export function newToscaCapabilityFilter(input, source) {
    let res;
    if (ToscaCapabilityFilter.isValid(input, source)) {
        res = new ToscaCapabilityFilter(input, source);
    } else {
        res = {};
    }
    return res;
}