import { ToscaNode } from './tosca_node.js';

export class ToscaWorkflowActivityInline extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.workflow = input.workflow;
        this.inputs = input.inputs;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

}

export function newToscaWorkflowActivityInline(input, source) {
    let res;
    if (ToscaWorkflowActivityInline.isValid(input, source)) {
        res = new ToscaWorkflowActivityInline(input, source);
    } else {
        res = {};
    }
    return res;
}