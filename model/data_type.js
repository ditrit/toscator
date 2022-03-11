import { ToscaType } from "./tosca_type.js"

export class ToscaDataType extends ToscaType {
    constructor(input, source) {
        super(input, source)
    }

    static _classname = 'data_type'
    
    getClassname() {
        return ToscaDataType._classname
    }

    toString() {
        return super.toString()
    }
    static isValid(input, source) {
        if(!ToscaType.isValid(input, source)) {
            
            source.ctx.typeError(source.current, 'Incorrect definition for DataType')
            return false
        }
        return true
    }
}

export function newToscaDataType(input, source) {
    let res
    if (ToscaDataType.isValid(input, source)) {
        res = new ToscaDataType(input, source)
    } else {
        res = {}
    }
    return res
}