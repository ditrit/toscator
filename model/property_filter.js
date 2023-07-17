import { ToscaNode } from "./tosca_node.js";

export class ToscaPropertyFilter extends ToscaNode{
    /* 
    I'm not sure about the attributes since they aren't all featured in the documentation.
    Therefore I don't really know what they are for (value...)
    */
    constructor(input, source) {
        super(source);
        this.name = input.name;
        this.constraints = input.constraints;
        this.values = input.values;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }
  
}

export function newToscaPropertyFilter(input, source) {
    let res;
    if (ToscaPropertyFilter.isValid(input, source)) {
       res = new ToscaPropertyFilter(input, source);
    } else {
       res = {};
    }
    return res;
}