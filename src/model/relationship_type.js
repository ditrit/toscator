import { ToscaType } from "./tosca_type.js"

export class ToscaRelationshipType extends ToscaType {
    constructor(input, source) {
        super(input, source)
    }

    static _classname = 'relationship_type'
    
    getClassname() {
        return ToscaRelationshipType._classname
    }

    toString() {
        return super.toString()
    }
    static isValid(input, source) {
        if(!ToscaType.isValid(input, source)) {
            
            source.ctx.typeError(source.current, 'Incorrect definition for RelationshipType')
            return false
        }
        return true
    }
}

export function newToscaRelationshipType(input, source) {
    let res
    if (ToscaRelationshipType.isValid(input, source)) {
        res = new ToscaRelationshipType(input, source)
    } else {
        res = {}
    }
    return res
}