import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { addTopology, selectSubstituteServiceTemplate } from '#src/substitution/mapping_substitution.js';
import { Parser } from '#src/parser/parse.js';

const parser = new Parser(new NodeJsFileManager());
// abstract node
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_add_topology/abstractNode.yml');
const mysql_compute = abs_st.topology_template.node_templates.get('mysql_compute');

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_add_topology/concreteNode.yml');

console.log('///////////////////// BEFORE abstract_service_template: /////////////////////');
console.log(abs_st.topology_template.node_templates);

const topo_temp = selectSubstituteServiceTemplate(mysql_compute, [concrete_st]);
if (topo_temp) {
  addTopology(abs_st, topo_temp);
}

console.log('///////////////////// AFTER abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);
console.log(abs_st.topology_template.node_templates);
