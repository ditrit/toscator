import { substitution } from '../../../../substitution/substitution.js';
import { parse } from '../../../../parser/parse.js';

// ------------------------ Tests of substitution_mapping ------------------------
// abstract node
const abs_st = parse('./tests/data_manual/test_substitution/test_substitution/mappingAbstractNode.yml');

// concrete node
const concrete_st = parse('./tests/data_manual/test_substitution/test_substitution/mappingConcreteNode.yml');

console.log('///////////////////// BEFORE abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);

substitution(abs_st, [concrete_st]);

console.log('///////////////////// AFTER abstract_service_template: /////////////////////');
console.log(abs_st.topology_template);