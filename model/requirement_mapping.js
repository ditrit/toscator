import { ToscaNode } from "./tosca_node.js";

export class ToscaRequirementMapping extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.mapping = input.mapping;
        this.properties = input.properties;
        this.attributes = input.attributes;
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

export function newToscaRequirementMapping(input, source) {
    let res;
    if (ToscaRequirementMapping.isValid(input, source)) {
        res = new ToscaRequirementMapping(input, source);
    } else {
        res = {};
    }
    return res;
}