import { ToscaNode } from './tosca_node.js';

export class ToscaWorkflowActivity extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.delegate = input.delegate;
        this.set_state = input.set_state;
        this.call_operation = input.call_operation;
        this.inline = input.inline;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

}

export function newToscaWorkflowActivity(input, source) {
    let res;
    if (ToscaWorkflowActivity.isValid(input, source)) {
        res = new ToscaWorkflowActivity(input, source);
    } else {
        res = {};
    }
    return res;
}