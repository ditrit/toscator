import { ToscaNode } from './tosca_node.js';

export class ToscaImperativeWorkflowStep extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.target = input.target;
        this.activities = input.activities;
        this.target_relationship = input.target_relationship;
        this.filter = input.filter;
        this.operation_host = input.operation_host;
        this.on_success = input.on_success;
        this.on_failure = input.on_failure;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaImperativeWorkflowStep(input, source) {
    let res;
    if (ToscaImperativeWorkflowStep.isValid(input, source)) {
        res = new ToscaImperativeWorkflowStep(input, source);
    } else {
        res = {};
    }
    return res;
}