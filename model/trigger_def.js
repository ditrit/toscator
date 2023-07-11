import { ToscaNode } from "./tosca_node.js";

export class ToscaTriggerDef extends ToscaNode {
    constructor(input, source) {
        super(source);
        this.name = input.name;
        this.description = input.description;
        this.event = input.event;
        this.schedule = input.schedule;
        this.target_filter = input.target_filter;
        this.condition = input.condition;
        this.action = input.action;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    } 
}

export function newToscaTriggerDef(input, source){
    let res;
    if (ToscaTriggerDef.isValid(input, source)) {
        res = new ToscaTriggerDef(input, source);
    } else {
        res = {};
    }
    return res;
}