import { ToscaInterfaceAssignment } from "./interface_assignment.js";

export class ToscaInterfaceDef extends ToscaInterfaceAssignment{
    constructor(input, source) {
        super(input, source);
        this.type = input.type;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaInterfaceDef(input, source) {
    let res;
    if (ToscaInterfaceDef.isValid(input, source)) {
        res = new ToscaInterfaceDef(input, source);
    } else {
        res = {};
    }
    return res;
}