import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { mappingSubstitution } from '#src/substitution/mapping_substitution.js';
import { Parser } from '#src/parser/parse.js';

// abstract node

const parser = new Parser(new NodeJsFileManager());
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_mapping_substitution/abstractNode.yml');
const mysql_compute = abs_st.topology_template.node_templates.get('mysql_compute');

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_mapping_substitution/concreteNode.yml');

console.log('///////////////////// BEFORE abstract_service_template: /////////////////////');
console.log(abs_st.topology_template.node_templates);

mappingSubstitution(abs_st, mysql_compute, [concrete_st]);

console.log('///////////////////// AFTER abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);
console.log(abs_st.topology_template.node_templates);
