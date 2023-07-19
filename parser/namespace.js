/**
 * fill the namespace with the objects inside the current_service_template by duplicating in the current_service_template the objects for each names they can be called with
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
        //console.log("\n-----------------------------------")
        //console.log(attribute)
 
        const short_names = new Map();
        const ns_names = new Map();
        
        cst[attribute].forEach((element, name) => {
            // if there is no "." inside it's not a real full_name accordint to TOSCA, but it helps in the implementation to considrer it as such
            element.setNameCategory("full_name");
            const name_parts = name.split(".");
            const short_name = name_parts[name_parts.length-1];
            // TO DO: as it is, if 2 elements have the same short name, then only the 1st one will have a short_name copy
            // while it should simply not create any short_names ? And I don't think it should raise an error
            if (name !== short_name && !short_names.has(short_name)) {
                const copy = element.copy();
                copy.setNameCategory("short_name");
                short_names.set(short_name, copy);
            }
            // no need for more checks since there can't be several times the same key in a map nor can there be a namespace in a name ?
            if (current_namespace) {
                //console.log("if ns_name")
                const copy = element.copy();
                copy.setNameCategory("default_ns_uri");
                ns_names.set(current_namespace + "/" + name, copy);
            }
        })
        /*console.log("\nshort_names:")
        console.log(short_names)
        console.log("ns_names:")
        console.log(ns_names)
        console.log("cst[attribute]:")
        console.log(cst[attribute])*/
        cst[attribute] = new Map([...cst[attribute], ...short_names, ...ns_names]);
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
        if (attribute === "node_types") {
            //console.log(cst[attribute])
        }
        cst[attribute].forEach((element, name) => {
            // if there is no conflict then export as it is
            if (element.getNameCategory() === "default_ns_uri" || element.getNameCategory() === "short_name") {
                if (!pst[attribute].has(name)) {
                    pst[attribute].set(name, element);
                }
            }
            // if there is no conflict then export as it is. Also export copy with import_ns_uri + full_name, 
            // import_ns_prefix + full_name and pst_ns_uri + full_name as name (for the namespace, not the name attribute of the object) too
            if (element.getNameCategory() === "full_name") {
                if (!pst[attribute].has(name)) {
                    pst[attribute].set(name, element);
                }
                if (file_import.namespace_uri) {
                    const ns_uri_name = file_import.namespace_uri + "/" + name;
                    if (!pst[attribute].has(ns_uri_name)) {
                        const copy = element.copy();
                        copy.setNameCategory("import_ns_uri");
                        pst[attribute].set(ns_uri_name, copy);
                    } 
                }
                if (file_import.namespace_prefix) {
                    const ns_prefix_name = file_import.namespace_prefix + "." + name;
                    if (!pst[attribute].has(ns_prefix_name)) {
                        const copy = element.copy();
                        copy.setNameCategory("prefix");
                        pst[attribute].set(ns_prefix_name, copy);
                    }
                }
                if (pst.namespace.value) {
                    const pst_ns_uri_name = pst.namespace.value + "/" + name;
                    if (!pst[attribute].has(pst_ns_uri_name)) {
                        const copy = element.copy();
                        copy.setNameCategory("default_ns_uri");
                        pst[attribute].set(pst_ns_uri_name, copy);
                    }
                }
            }
        })
    });
    //console.log("//////////////////////////////////////////////// END EXPORT ///////////////////////////////////////////////////");
}