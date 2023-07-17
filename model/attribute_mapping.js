import { ToscaNode } from "./tosca_node.js";

export class ToscaAttributeMapping extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.mapping = input.mapping;
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

export function newToscaAttributeMapping(input, source) {
    let res;
    if (ToscaAttributeMapping.isValid(input, source)) {
        res = new ToscaAttributeMapping(input, source);
    } else {
        res = {};
    }
    return res;
}