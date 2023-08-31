import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { Parser } from '#src/parser/parse.js';
import { nodeFilterSubstitute } from '#src/substitution/node_filter_substitution.js';

const parser = new Parser(new NodeJsFileManager());

// abstract node
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_nodeFilterSubstitute/abstractNode.yml');
const mysql_compute = abs_st.topology_template.node_templates.get('mysql_compute');

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_nodeFilterSubstitute/concreteNode.yml');
const concrete_st2 = parser.parse('./tests/data_manual/test_substitution/test_nodeFilterSubstitute/concreteNode2.yml');

console.log('///////////////////// BEFORE abstract_service_template: /////////////////////');
console.log(abs_st.topology_template.node_templates);

nodeFilterSubstitute(abs_st, mysql_compute, [concrete_st, concrete_st2]);

console.log('///////////////////// AFTER abstract_service_template: /////////////////////');
console.log(abs_st.topology_template.node_templates);
