import { ToscaNode } from "./tosca_node.js";

export class ToscaGroupDef extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.type = input.type;
        this.description = input.description;
        this.properties = input.properties;
        this.members = input.members;
        this.metadata = input.metadata;
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

export function newToscaGroupDef(input, source) {
    let res;
    if (ToscaGroupDef.isValid(input, source)) {
        res = new ToscaGroupDef(input, source);
    } else {
        res = {};
    }
    return res;
}