import { ToscaNode } from "./tosca_node.js";

export class ToscaNodeFilter extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.properties_filter = input.properties_filter;
        this.capabilities_filter = input.capabilities_filter;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaNodeFilter(input, source) {
    let res;
    if(ToscaNodeFilter.isValid(input, source)) {
        res = new ToscaNodeFilter(input, source);
    } else {
        res = {}
    }
    return res;
}