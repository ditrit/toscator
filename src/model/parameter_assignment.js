import { ToscaNode } from "./tosca_node.js";

export class ToscaParameterAssignment extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.description = input.description;
        this.value = input.value;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        if (input) {
            return true;
        }
        return false;
    }

    setName(name) {
        this.name = name;
    }
}

export function newToscaParameterAssignment(input, source) {
    let res;
    if (ToscaParameterAssignment.isValid(input, source)) {
       res = new ToscaParameterAssignment(input, source);
    } else {
       res = {};
    }
    return res;
}