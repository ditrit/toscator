import { ToscaNode } from "./tosca_node.js";

export class ToscaInterfaceMapping extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.operation = input.operation;
        this.workflow = input.workflow;
    }

    toString() {
        return super.toString();
    }
    static isValid(input, source) {
        // TODO: check for valid path
        return true;
    }
    setName(name) {
        this.name = name;
    }
}

export function newToscaInterfaceMapping(input, source) {
    if (ToscaInterfaceMapping.isValid(input, source))
        return new ToscaInterfaceMapping(input, source);
    return {}
}