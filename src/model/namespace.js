import { ToscaNode } from "./tosca_node.js"

export class ToscaNamespace extends ToscaNode {
    constructor(input, source) {
        super(source)
        this.value = input
    }
    toString() {
        return `${this.value}`
    }
    static isValid(input, source) {
        if (typeof(input) != 'string' || input == "") {
            source.ctx.grammarError('Incorrect input for namespace')
            return false
        }

        if (input.match('http://docs.oasis-open.org/tosca')) {
            source.ctx.grammarError('Incorrect input for namespace:\nthis namespace is reserved for TOSCA approved work product');
            return false;
        }

        return true
    }
}

export function newToscaNamespace(input, source) {
    let res
    if (ToscaNamespace.isValid(input, source)) {
        res = new ToscaNamespace(input, source)
    } else {
        res = {}
    }
    return res
}