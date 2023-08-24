import { ToscaNode } from './tosca_node.js';

export class ToscaTargetFilter extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.node = input.node;
        this.requirement = input.requirement;
        this.capability = input.capability;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

}

export function newToscaTargetFilter(input, source) {
    let res;
    if (ToscaTargetFilter.isValid(input, source)) {
        res = new ToscaTargetFilter(input, source);
    } else {
        res = {};
    }
    return res;
}