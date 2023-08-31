import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { Parser } from '#src/parser/parse.js';

const parser = new Parser(new NodeJsFileManager());

// abstract node
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_capability_filter_passFilter/abstractNode.yml');
const abs_host = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.capabilities[0].host;
const abs_os = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.capabilities[1].os;

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_capability_filter_passFilter/concreteNode.yml');
const c_host = concrete_st.topology_template.node_templates.get('compute').capabilities.get('host');
const c_os = concrete_st.topology_template.node_templates.get('compute').capabilities.get('os');

console.log(abs_host.passFilter(c_host));
console.log(abs_os.passFilter(c_os));
