import { ToscaServiceTemplate } from "./service_template.js"
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
        exportToParentTemplate(parent_st, current_st, parsed_rule, category, name);
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

/**
 * exportToParentTemplate exports the types present in the 
 * current_service_template to the parent_service_template
 * @param {ToscaServiceTemplate} pst = parent_service_template
 * @param {ToscaServiceTemplate} cst = current_service_template
 * @param {AST} parsed_rule 
 * @param {string} ctg = "<class>_types"
 * @param {string} name = "node_type_name"
 */
function exportToParentTemplate(pst, cst, parsed_rule, ctg, name) {
    let namespace = (cst.ns_uri) ? cst.ns_uri : cst.namespace.value
        if (pst) {
            if (pst[ctg][namespace + "/" + name]) {
                parsed_rule.ctx.grammarError('Type collision : ');
                console.log("Erreur de collision de type");
            } else {
                pst[ctg][namespace + "/" + name] = this

            }
            if (cst.ns_prefix) {
                if (pst[ctg][cst.ns_prefix + "." + name]) {
                    parsed_rule.ctx.grammarError('Type collision : ')
                    console.log("Erreur de collision de type");
                } else {
                    pst[ctg][cst.ns_prefix + "." + name] = this
                }
            }
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
