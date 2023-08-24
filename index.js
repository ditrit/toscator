import {compile} from './src/substitution/compilation.js';

const result = compile('tests/data_manual/ToscaNextcloud.yml',[]);
console.log(result);
