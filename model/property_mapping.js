import { ToscaNode } from "./tosca_node.js";

export class ToscaPropertyMapping extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.value = input.value;
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

export function newToscaPropertyMapping(input, source) {
    let res;
    if (ToscaPropertyMapping.isValid(input, source)) {
        res = new ToscaPropertyMapping(input, source);
    } else {
        res = {};
    }
    return res;
}