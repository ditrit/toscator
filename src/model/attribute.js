import { Charac } from './Charac.js';

export class ToscaAttribute extends Charac {
    constructor(input, source) {
        super(input, source);
    }

    static _classname = 'attribute';

    getClassname() {
        return ToscaAttribute._classname;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        let res = true;
        if (!super.isValid(input, source)) {
            res = false;
        }

        return res;
    }
}

export function newToscaAttribute(input, source) {
    let res;
    ToscaAttribute.isValid(input, source)
        ? (res = new ToscaAttribute(input, source))
        : (res = {});
    return res;
}
