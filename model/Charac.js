import {
    ToscaMetadata
} from "./metadata.js"
import {
    DefType
} from "./def_type.js"
import {
    ToscaNodeType
} from "./node_type.js"

export class Charac extends ToscaNodeType {
    constructor(input, source) {
        super(input, source)
        this.type = input.type
        this.default = input.default
        this.status = input.status
        this.metadata = input.metadata
        this.name = input.name
    }
    static statusValues = ['supported', 'unsupported', 'experimental', 'deprecated', 'optional'];

    static isValid(input) {
        let res = true
        if (!super.isValid(input)) {
            res = false
        }
        // if (input.default && !input.default instanceof ToscaValue) { // TODO
        //     res=false
        // }
        if (input.status && !input.status instanceof String) {
            res = false
        } else if (!input.status in this.statusValues) {
            res = false
        }
        if (input.metadata && !input.metadata instanceof ToscaMetadata) {
            res = false
        }
        if (input.name && !input.name instanceof String) {
            res = false
        }
        return res
    }
}

export function newCharac(input, source) {
    let res
    Charac.isValid(input) ? res = newCharac(input, source) : res = {}
    return res
}