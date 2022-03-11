import { ToscaType } from "./tosca_type.js"

export class ToscaArtifactType extends ToscaType {
    constructor(input, source) {
        super(input, source)
    }

    static _classname = 'artifact_type'
    
    getClassname() {
        return ToscaArtifactType._classname
    }

    toString() {
        return super.toString()
    }
    static isValid(input, source) {
        if(!ToscaType.isValid(input, source)) {
            
            source.ctx.typeError(source.current, 'Incorrect definition for ArtifactType')
            return false
        }
        return true
    }
}

export function newToscaArtifactType(input, source) {
    let res
    if (ToscaArtifactType.isValid(input, source)) {
        res = new ToscaArtifactType(input, source)
    } else {
        res = {}
    }
    return res
}