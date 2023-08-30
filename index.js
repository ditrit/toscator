import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';

RuleParser.throwOnError = true;
// const result = compile('tests/data_manual/ToscaNextcloud.yml');
const result = compile('tests/unit/types/node_type_derived_from.yml');
console.log(result);
