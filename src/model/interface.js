import { ToscaNode } from './tosca_node.js';

export class ToscaInterface extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.type = input.type;
        this.inputs = input.inputs;
        this.operations = input.operations;
        this.notifications = input.notifications;
    }
    static _classname = 'requirement';

    getClassname() {
        return ToscaInterface._classname;
    }

    toString() {
        return super.toString();
    }
    static isValid(input, source) {
        if (!typeof input.capability === 'string') {
            source.ctx.typeError(
                source.current,
                'Incorrect definition for requirement'
            );
            return false;
        }
        //   if (input.properties instanceof ToscaProperty) {
        //   }
        return true;
    }
}

export function newToscaInterface(input, source) {
    let res;
    if (ToscaInterface.isValid(input, source)) {
        res = new ToscaInterface(input, source);
    } else {
        res = {};
    }
    return res;
}
