import { ToscaNode } from './tosca_node.js';

export class ToscaOperationDef extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.description = input.description;
        this.inputs = input.inputs;
        this.implementation = input.implementation; //is either a name or the entire definition
        this.outputs = input.outputs;
    }

    getClassname() {
        return OperationDef._classname;
    }

    toString() {
        return super.toString();
    }

    setName(name) {
        this.name = name;
    }
    static isValid(input, source) {
        //TODO: Check if the implementation is valid
        return true;
    }
}

export function newToscaOperationDef(input, source) {
    let res;
    if (ToscaOperationDef.isValid(input, source)) {
        res = new ToscaOperationDef(input, source);
    } else {
        res = {};
    }
    return res;
}
