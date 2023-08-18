import { ToscaServiceTemplate } from "../model/service_template.js";

/**
 * fill the namespace with the objects inside the current_service_template by duplicating in the current_service_template the objects for each names they can be called with
 * also changes the structure of current_service_template: now the ..._types are Map<ToscaTypeName, {type: ToscaType, name_ctg: string}>
 * @param {ToscaServiceTemplate} cst = current_service_template
 */
export function localNames(cst) {
    //console.log("//////////////////////////////////////////// START LOCAL NAMES ////////////////////////////////////////////");
    const current_namespace = cst.namespace.value;
    const st_attributes = [ // we don't want to loop on all the attributes such as topology_template...?
       "artifact_types",
       "data_types",
       "capability_types",
       "interface_types",
       "relationship_types",
       "node_types",
       "group_types",
       "policy_types"
    ]
    st_attributes.forEach(attribute => {
        
        const full_names = new Map();
        const short_names = new Map();
        const ns_names = new Map();
        
        cst[attribute]?.forEach((element, name) => {
            // if there is no "." inside it's not a real full_name accordint to TOSCA, but it helps in the implementation to consider it as such
            full_names.set(name, {type: element, name_ctg: "full_name"})

            const name_parts = name.split(".");
            const short_name = name_parts[name_parts.length-1];
            // TO DO: as it is, if 2 elements have the same short name, then only the 1st one will have a short_name copy
            // while it should simply not create any short_names ? And I don't think it should raise an error
            if (name !== short_name && !short_names.has(short_name)) {
                short_names.set(short_name, {type: element, name_ctg: "short_name"});
            }
            // no need for more checks since there can't be several times the same key in a map nor can there be a namespace in a name ?
            if (current_namespace) {
                ns_names.set(current_namespace + "/" + name, {type: element, name_ctg: "default_ns_uri"});
            }
        })
        cst[attribute] = new Map([...full_names, ...short_names, ...ns_names]);
        //console.log(cst[attribute])
    });
    //console.log("///////////////////////////////////////////////////////////////////////////////////////////////////");
 }
 
 /**
  * export the objects from the current_service_template to the parent_service_template
  * should I raise errors when there is a name conflict or should I prioritize the order ?
  * only add the namespace_prefix, the namespace_uri and the pst's namespace to the full names
  * @param {ToscaImport} file_import is the ToscaImport instance used to import the current_service_template
  * @param {ToscaServiceTemplate} pst = parent_service_template 
  * @param {ToscaServiceTemplate} cst = current_service_template
  */
export function exportToParent(file_import, pst, cst) {
    //console.log("//////////////////////////////////////////////// START EXPORT ///////////////////////////////////////////////////");
    const st_attributes = [
       "artifact_types",
       "data_types",
       "capability_types",
       "interface_types",
       "relationship_types",
       "node_types",
       "group_types",
       "policy_types"
    ]
    st_attributes.forEach(attribute => {
        // Note: Here element = {type: ToscaType, name_ctg: String} unlike in localNames
        cst[attribute].forEach((element, name) => {
            // if there is no conflict then export as it is
            if (element.name_ctg === "default_ns_uri" || element.name_ctg === "short_name") {
                if (!pst[attribute].has(name)) {
                    pst[attribute].set(name, element);
                }
            }
            // if there is no conflict then export as it is. Also export copy with import_ns_uri + full_name, 
            // import_ns_prefix + full_name and pst_ns_uri + full_name as name (for the namespace, not the name attribute of the object) too
            if (element.name_ctg === "full_name") {
                if (!pst[attribute].has(name)) {
                    pst[attribute].set(name, element);
                }
                if (file_import.namespace_uri) {
                    const ns_uri_name = file_import.namespace_uri + "/" + name;
                    if (!pst[attribute].has(ns_uri_name)) {
                        pst[attribute].set(ns_uri_name, {type: element.type, name_ctg: "import_ns_uri"});
                    } 
                }
                if (file_import.namespace_prefix) {
                    const ns_prefix_name = file_import.namespace_prefix + "." + name;
                    if (!pst[attribute].has(ns_prefix_name)) {
                        pst[attribute].set(ns_prefix_name, {type: element.type, name_ctg: "prefix"});
                    }
                }
                if (pst.namespace.value) {
                    const pst_ns_uri_name = pst.namespace.value + "/" + name;
                    if (!pst[attribute].has(pst_ns_uri_name)) {
                        pst[attribute].set(pst_ns_uri_name, {type: element.type, name_ctg: "default_ns_uri"});
                    }
                }
            }
        })
    });
    //console.log("//////////////////////////////////////////////// END EXPORT ///////////////////////////////////////////////////");
}

/**
 * We added the token name_ctg to import but it modified the structure of the service template
 * We are now returning to the old structure since we don't need it anymore
 * @param {ToscaServiceTemplate} cst 
 */
export function getRidOfNameCtg(cst) {
    const st_attributes = [
        "artifact_types",
        "data_types",
        "capability_types",
        "interface_types",
        "relationship_types",
        "node_types",
        "group_types",
        "policy_types"
    ]
    st_attributes.forEach(attribute => {
        const types = new Map();
        cst[attribute].forEach((element, name) => {
            types.set(name, element.type);
        });
        cst[attribute] = types;
    });
}