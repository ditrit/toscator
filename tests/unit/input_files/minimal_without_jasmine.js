import { parse } from '../../index.js';
import { ToscaProg } from '../../model/prog.js';

const version_ok = 'data/minimal_file/version_ok.yml';
const empty_file = 'data/minimal_file/empty_file.yml';
const bad_path_file = 'data/minimal_file/bad_path_file.yml';
const bad_path_url = 'https://orness.com/minimal_file/bad_path_file.yml';
const bad_version = 'data/minimal_file/bad_version.yml';

console.log('Minimal file compilation provides ToscaProg object');
console.log(parse(bad_version) instanceof (ToscaProg));

console.log('bad path file raises an error');
console.log((parse(bad_path_file).errors.length)>=1 );

console.log('bad path url raises an error');
console.log((parse(bad_path_url).errors.length)>=1 );

console.log('Empty file raises an error');
console.log((parse(empty_file).errors.length)>=1 );

console.log('Minimal file compilation provides no errors');
console.log((parse(version_ok).errors.length)===0 );

console.log('Minimal file provides correct Tosca version');
console.log((parse(version_ok).current_service_template?.tosca_definconsole.logions_version)==='tosca_simple_yaml_1_3');

console.log('Minimal file with bad version keyword');
console.log((parse(bad_version).errors.length)>=1 );