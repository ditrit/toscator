import { ToscaNode } from "./tosca_node.js";

export class ToscaWorkflowActivityCallOperation extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.operation = input.operation;
        this.inputs = input.inputs;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

}

export function newToscaWorkflowActivityCallOperation(input, source) {
    let res;
    if (ToscaWorkflowActivityCallOperation.isValid(input, source)) {
        res = new ToscaWorkflowActivityCallOperation(input, source);
    } else {
        res = {};
    }
    return res;
}