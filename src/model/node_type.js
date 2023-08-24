import { ToscaProperty } from './property.js';
import { ToscaType } from './tosca_type.js';

export class ToscaNodeType extends ToscaType {
    constructor(input, source) {
        super(input, source);
        this.properties = input.properties;
        this.attributes = input.attributes;
        this.capabilities = input.capabilities;
        this.requirements = input.requirements;
        this.artifacts = input.artifacts;
        this.interfaces = input.interfaces;
        //this.wofkflows = input.wofkflows;
    }

    static _classname = 'node_type';

    getClassname() {
        return ToscaNodeType._classname;
    }

    toString() {
        return super.toString();
    }
    static isValid(input, source) {
        if (!ToscaType.isValid(input, source)) {
            source.ctx.typeError(
                source.current,
                'Incorrect definition for NodeType'
            );
            return false;
        }
        if (input.properties instanceof ToscaProperty) {
        }
        return true;
    }
}

export function newToscaNodeType(input, source) {
    let res;
    if (ToscaNodeType.isValid(input, source)) {
        res = new ToscaNodeType(input, source);
    } else {
        res = {};
    }
    return res;
}
