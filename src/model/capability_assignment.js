import { ToscaNode } from './tosca_node.js';

export class ToscaCapabilityAssignment extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.properties = input.properties;
        this.attributes = input.attributes;
        this.occurences = input.occurences;
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

export function newToscaCapabilityAssignment(input, source) {
    let res;
    if (ToscaCapabilityAssignment.isValid(input, source)) {
        res = new ToscaCapabilityAssignment(input, source);
    } else {
        res = {};
    }
    return res;
}