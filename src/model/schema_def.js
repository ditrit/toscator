import { ToscaNode } from './tosca_node.js';

export class ToscaSchemaDef extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.type = input.type;
        this.description = input.description;
        this.constraints = input.constraints;
        this.entry_schema = input.entry_schema;
        this.key_schema = input.key_schema;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    } 
}

export function newToscaSchemaDef(input, source) {
    let res;
    if (ToscaSchemaDef.isValid(input, source)) {
        res = new ToscaSchemaDef(input, source);
    } else {
        res = {};
    }
    return res;
}