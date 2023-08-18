import { mappingSubstitution } from "../../../../substitution/mapping_substitution.js";
import { parse } from "../../../../parser/parse.js";

// abstract node
const abs_st = parse("./tests/data_manual/test_substitution/test_mapping_substitution/abstractNode.yml");
const mysql_compute = abs_st.topology_template.node_templates.get("mysql_compute");

// concrete node
const concrete_st = parse("./tests/data_manual/test_substitution/test_mapping_substitution/concreteNode.yml");

console.log("///////////////////// BEFORE abstract_service_template: /////////////////////")
console.log(abs_st.topology_template.node_templates)

mappingSubstitution(abs_st, mysql_compute, [concrete_st]);

console.log("///////////////////// AFTER abstract_service_template: /////////////////////")
console.log(abs_st.topology_template)
console.log(abs_st.topology_template.node_templates)