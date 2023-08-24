import { ToscaNode } from './tosca_node.js';

export class ToscaRelationshipDef extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.type = input.type;
        this.interfaces = input.interfaces;
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

export function newToscaRelationshipDef(input, source) {
    let res;
    if (ToscaRelationshipDef.isValid(input, source)) {
        res = new ToscaRelationshipDef(input, source);
    } else {
        res = {};
    }
    return res;
}