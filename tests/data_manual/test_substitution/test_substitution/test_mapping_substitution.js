// ------------------------ Tests of substitution_mapping ------------------------

import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { substitution } from '#src/substitution/substitution.js';
import { Parser } from '#src/parser/parse.js';

const parser = new Parser(new NodeJsFileManager());
// abstract node
const abs_st = parser.parse('./tests/data_manual/test_substitution/test_substitution/mappingAbstractNode.yml');

// concrete node
const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_substitution/mappingConcreteNode.yml');

console.log('///////////////////// BEFORE abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);

substitution(abs_st, [concrete_st]);

console.log('///////////////////// AFTER abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);
