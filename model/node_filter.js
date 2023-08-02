import { ToscaNode } from "./tosca_node.js";

export class ToscaNodeFilter extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.properties = input.properties;
        this.capabilities = input.capabilities;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

    // abstract node ? Yeah if used in sub_mapping, but how can it check values then ?
    // since an abstract node won't have any value
    passFilter(abstract_node) {
        let pass = true;
        this.properties?.forEach(ppty => {
            // pb if properties = undefined ?
            if (!abstract_node.properties[ppty.name]
                || !ppty.passFilter(abstract_node.properties[ppty.name])) {
                pass = false;
            }
        });
        this.capabilities?.forEach(capa => {
            // pb if capabilities = undefined ?
            if (!abstract_node.capabilities[capa.name]
                || !capa.passFilter(abstract_node.capabilities[capa.name])) {
                pass = false;
            }
        });
        return pass;
    }
}

export function newToscaNodeFilter(input, source) {
    let res;
    if(ToscaNodeFilter.isValid(input, source)) {
        res = new ToscaNodeFilter(input, source);
    } else {
        res = {}
    }
    return res;
}