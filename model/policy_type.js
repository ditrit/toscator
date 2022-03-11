import { ToscaType } from "./tosca_type.js"

export class ToscaPolicyType extends ToscaType {
    constructor(input, source) {
        super(input, source)
    }

    static _classname = 'policy_type'
    
    getClassname() {
        return ToscaPolicyType._classname
    }

    toString() {
        return super.toString()
    }
    static isValid(input, source) {
        if(!ToscaType.isValid(input, source)) {
            
            source.ctx.typeError(source.current, 'Incorrect definition for PolicyType')
            return false
        }
        return true
    }
}

export function newToscaPolicyType(input, source) {
    let res
    if (ToscaPolicyType.isValid(input, source)) {
        res = new ToscaPolicyType(input, source)
    } else {
        res = {}
    }
    return res
}