import { ToscaNode } from './tosca_node.js';

export class ToscaPolicyDef extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.type = input.type;
        this.description = input.description;
        this.metadata = input.metadata;
        this.properties = input.properties;
        this.targets = input.targets;
        this.triggers = input.triggers;
    }

    toString() {
        return super.toString();
    }

    static isValid() {
        return true;
    }

    setName(name) {
        this.name = name;
    }
}

export function newToscaPolicyDef(input, source) {
    let res;
    if (ToscaPolicyDef.isValid(input, source)) {
        res = new ToscaPolicyDef(input, source);
    } else {
        res = {};
    }
    return res;
}