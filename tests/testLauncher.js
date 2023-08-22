import {
    parse
} from '../src/parser/parse.js';

// modification du path qui était incorrect : manque du tests
let res = parse('./tests/data/import/loop_import_test.yml');

console.log('//////////////////////////////// parse ////////////////////////////////');
if (res.errors.length != 0) {
    console.log('TOSCA ERROR : ');
    res.errors.forEach(e => console.log(e));
} else {
    // console.log(res.service_templates[0].imports);
    res.service_templates.forEach(st => {
        console.log(st);
    });
}
