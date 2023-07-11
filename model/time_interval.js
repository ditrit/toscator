import { ToscaNode } from "./tosca_node.js";

export class ToscaTimeInterval extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.start_time = input.start_time;
        this.end_time = input.end_time;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    } 
}

export function newToscaTimeInterval(input, source){
    let res;
    if (ToscaTimeInterval.isValid(input, source)) {
        res = new ToscaTimeInterval(input, source);
    } else {
        res = {};
    }
    return res;
}