import { selectSubstituteServiceTemplate, addTopology, linkTopology } from "../../../../substitution/mapping_substitution.js";
import { parse } from "../../../../parser/parse.js";

// abstract node
const abs_st = parse("./tests/data_manual/test_substitution/test_link_topology/abstractNode.yml");
const abs1 = abs_st.topology_template.node_templates.get("abs1");

// concrete node
const concrete_st = parse("./tests/data_manual/test_substitution/test_link_topology/concreteNode.yml");

console.log("///////////////////// BEFORE abstract_service_template: /////////////////////");
console.log(abs_st.topology_template.node_templates);

const topo_temp = selectSubstituteServiceTemplate(abs1, [concrete_st]);
    if (topo_temp) {
        addTopology(abs_st, topo_temp);
        linkTopology(abs_st, abs1, topo_temp);
    }

console.log("///////////////////// AFTER abstract_service_template: /////////////////////");
/*console.log(abs_st.topology_template);
console.log("-------------- requirement_assignments --------------");
console.log(abs_st.topology_template.node_templates.get("node2").requirements);
console.log("--------------- substitution_mapping ---------------");
console.log(abs_st.topology_template.substitution_mappings.capabilities);
console.log(abs_st.topology_template.substitution_mappings.requirements);*/
console.log("-------------- policy_def -> triggers --------------");
abs_st.topology_template.policies.forEach(policy => {
    const policy_name = Object.keys(policy)[0];
    console.log(policy[policy_name].triggers)
});

