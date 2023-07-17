import { ToscaNode } from "./tosca_node.js"


export class ToscaType extends ToscaNode {
    constructor(input, source) {
        super(source)
        this.derived_from = input.derived_from
        this.version = input.version
        this.metadata = input.metadata
        this.description = input.description
    }



    setId(name, parsed_rule, category) {
        let current_st = parsed_rule.ctx.prog.current_service_template
        let parent_st = parsed_rule.ctx.prog.current_parent_service_template
        this.name = name
        let namespace_name = current_st.namespace.value

        // dans le current_st
        if (current_st[category][namespace_name + "/" + name]) {
            parsed_rule.ctx.grammarError('Type collision : ' + this.import_id)
            console.log("Erreur de collision de type");
        } else {
            current_st[category][namespace_name + "/" + name] = this
        }

        // dans le parent_st
        // si namspace_uri alors namespace = namespace_uri
        // sinon namespace = namespace
        let namespace = (current_st.ns_uri) ? current_st.ns_uri : namespace_name
        if (parent_st) {
            if (parent_st[category][namespace + "/" + name]) {
                parsed_rule.ctx.grammarError('Type collision : ');
                console.log("Erreur de collision de type");
            } else {
                parent_st[category][namespace + "/" + name] = this

            }
            if (current_st.ns_prefix) {
                if (parent_st[category][current_st.ns_prefix + "." + name]) {
                    parsed_rule.ctx.grammarError('Type collision : ')
                    console.log("Erreur de collision de type");
                } else {
                    parent_st[category][current_st.ns_prefix + "." + name] = this
                }
            }
        }
    }


    toString() {
        let str
        str += `{name: ${this.name}, \n    `
        str += `    Derived_from: ${this.derived_from}, \n    `
        if (this.version) { str += this.version }
        if (this.description) { str += this.description }
        if (this.metadata) { str += this.metadata }
        return str;
    }
    static isValid(input, source) {
        if (input) { // TODO
            return true;
        }
        return false;
    }
}

export function newToscaType(input, source) {
    let res
    if (ToscaType.isValid(input, source)) {
        res = newToscaType(input, source)
    } else {
        res = {}
    }
    return res
}
