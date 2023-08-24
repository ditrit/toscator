import { ToscaRelationshipDef } from './relationship_def.js';

export class ToscaRelationshipAssignment extends ToscaRelationshipDef{
    constructor(input, source) {
        super(input, source);
        this.properties = input.properties;
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

export function newToscaRelationshipAssignment(input, source) {
    let res;
    if (ToscaRelationshipAssignment.isValid(input, source)) {
        res = new ToscaRelationshipAssignment(input, source);
    } else {
        res = {};
    }
    return res;
}