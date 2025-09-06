import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';

// RuleParser.throwOnError = true;
const result = compile('tests/unit/spec_examples/data/spec_example_1.yml');
console.log('result: ', result);
