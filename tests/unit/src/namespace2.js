import { parse } from '../../index.js';

console.log('Tosca compiler ->');

const correct_namespace = 'data/namespace/correct_namespace.yml';
const incorrect_namespace = 'data/namespace/incorrect_namespace.yml';
const no_namespace = 'data/namespace/no_namespace.yml';

console.log('\n\nNamespace: ');

//console.log("\nCorrect namespace")
//console.log((parse(correct_namespace).current_service_template.namespace) instanceof (String) );

console.log('incorrect namespace type');
console.log((parse(incorrect_namespace).errors.length) >= 1 );

console.log('no namespace');
console.log((parse(no_namespace).errors.length) === 0 );