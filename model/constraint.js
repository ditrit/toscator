// TODO
// It is a skeleton to be fill

import { ToscaType } from "./tosca_type.js"

export class ToscaConstraint extends ToscaNode {
    constructor(input, source) {
        super(source)
        
    }

    static _classname = 'data_type'

    getClassname() {
        return ToscaDataType._classname
    }

    toString() {
        return super.toString()
    }

    static isValid(input, source) {
        return true // TODO
    }
}

export function newToscaConstraint(input, source) {
    let res
    if (ToscaConstraint.isValid(input, source)) {
        res = new ToscaConstraint(input, source)
    } else {
        res = {}
    }
    return res
}