import { ToscaNode } from './tosca_node.js';

export class ToscaInterfaceAssignment extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.inputs = input.inputs;
        this.operations = input.operations;
        this.notifications = input.notifications;
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

export function newToscaInterfaceAssignment(input, source) {
    let res;
    if (ToscaInterfaceAssignment.isValid(input, source)) {
        res = new ToscaInterfaceAssignment(input, source);
    } else {
        res = {};
    }
    return res;
}