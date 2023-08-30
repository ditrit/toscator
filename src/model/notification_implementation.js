import { ToscaNode } from "./tosca_node.js";

export class ToscaNotificationImplementation extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.primary = input.primary;
        this.dependencies = input.dependencies;
    }
    static _classname = "implementation";
    getClassname() {
        return ToscaArtifact._classname;
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

export function newToscaNotificationImplementation(input, source) {
    if (ToscaNotificationImplementation.isValid(input, source))
        return new ToscaNotificationImplementation(input, source);
    return {}
}
