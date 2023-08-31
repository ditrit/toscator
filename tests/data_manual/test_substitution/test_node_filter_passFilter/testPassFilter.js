import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { Parser } from '#src/parser/parse.js';

const parser = new Parser(new NodeJsFileManager());

// abstract node
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_node_filter_passFilter/abstractNode.yml');
const { node_filter } = abs_st.topology_template.node_templates.get('mysql_compute');

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_node_filter_passFilter/concreteNode.yml');
const compute = concrete_st.topology_template.node_templates.get('compute');
const compute2 = concrete_st.topology_template.node_templates.get('compute2');

const res = node_filter.passFilter(compute);
console.log('\npassFilter(compute) result: ');
console.log(res);

console.log('----------------- test 2 -----------------');
const res2 = node_filter.passFilter(compute2);
console.log('\npassFilter(compute2) result: ');
console.log(res2);
