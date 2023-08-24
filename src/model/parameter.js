import { Charac } from './Charac.js';

// it should extend ToscaProperty. However, according to the lidy grammar, there is a difference: metadata is not a property of input_parameter
export class ToscaParameter extends Charac {
    constructor(input, source) {
        super(input, source);
        this.constraints = input.constraints;
        this.value = input.value;
        this.metadata = input.metadata;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
}

export function newToscaParameter(input, source) {
    let res;
    if (ToscaParameter.isValid(input, source)) {
        res = new ToscaParameter(input, source);
    } else {
        res = {};
    }
    return res;
}