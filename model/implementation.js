import { ToscaNode } from "./tosca_node.js";

export class ToscaImplementation extends ToscaNode {
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

export function newToscaImplentation(input, source) {
    if (ToscaImplementation.isValid(input, source))
        return new ToscaImplementation(input, source);
    return {}
}
