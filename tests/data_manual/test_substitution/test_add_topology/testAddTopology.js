import { addTopology, selectSubstituteServiceTemplate } from "../../../../substitution/mapping_substitution.js";
import { parse } from "../../../../parser/parse.js";

// abstract node
const abs_st = parse("./tests/data_manual/test_substitution/test_add_topology/abstractNode.yml");
const mysql_compute = abs_st.topology_template.node_templates.get("mysql_compute");

// concrete node
const concrete_st = parse("./tests/data_manual/test_substitution/test_add_topology/concreteNode.yml");

console.log("///////////////////// BEFORE abstract_service_template: /////////////////////")
console.log(abs_st.topology_template.node_templates)

const topo_temp = selectSubstituteServiceTemplate(mysql_compute, [concrete_st]);
if (topo_temp) {
    addTopology(abs_st, topo_temp);
}

console.log("///////////////////// AFTER abstract_service_template: /////////////////////")
console.log(abs_st.topology_template)
console.log(abs_st.topology_template.node_templates)