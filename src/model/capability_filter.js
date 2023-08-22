import { ToscaCapabilityAssignment } from "./capability_assignment.js";
import { ToscaNode } from "./tosca_node.js";

export class ToscaCapabilityFilter extends ToscaNode{
    constructor(input, source) {
        super(source);
        this.name = input.name;
        this.properties = input.properties;
    }
    
    /**
     * 
     * @param {ToscaCapabilityAssignment} capability 
     * @returns {boolean}
     */
    passFilter(capability) {
        let pass = true;
        this.properties?.forEach((double) => {
            // pb if properties = undefined ?
            const ppty_name = Object.keys(double)[0];
            const ppty = double[ppty_name];
            if (
                !capability.properties.get(ppty.name)
                || !ppty.passFilter(capability.properties.get(ppty.name))
            ) {
                pass = false;
            }
        });
        return pass;
    }

    toString() {
        return super.toString();
    }

    static isValid(input, source) {
        return true;
    }

    setName(name) {
        this.name = name;
    }
}

export function newToscaCapabilityFilter(input, source) {
    let res;
    if (ToscaCapabilityFilter.isValid(input, source)) {
        res = new ToscaCapabilityFilter(input, source);
    } else {
        res = {};
    }
    return res;
}