import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';

RuleParser.throwOnError = true;
const result = compile('tests/data_manual/ToscaNextcloud.yml');
console.log(result);
