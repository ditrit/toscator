import { ToscaNode } from './tosca_node.js';

export class ToscaWorkflowPrecondition extends ToscaNode {
    constructor(input, sourcee) {
        super(source);
        this.target = input.target;
        this.target_relationship = input.target_relationship;
        this.condition = input.condition;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaWorkflowPrecondition(input, source) {
    let res;
    if (ToscaWorkflowPrecondition.isValid(input, source)) {
        res = new ToscaWorkflowPrecondition(input, source);
    } else {
        res = {};
    }
    return res;
}