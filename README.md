# toscator

Tosca 1.3 compiler

## Getting Started

Please read this entire file **before** you start writing code.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* Clone the repository
* Install the dependencies: `npm install`
* Check that the tests run: `npm run test`

### IDE

Please use **Webstorm**, as its understanding of types is well better than  in **VSCode**, unless you really know what you are doing.

**Webstorm** is free for students : https://www.jetbrains.com/community/education/

### ESLint

To keep the code clean, we use ESLint. You should enable the option to automatically run **eslint** when you save a file.

- VSCode: https://www.digitalocean.com/community/tutorials/workflow-auto-eslinting#step-4-adding-code-actions-on-save
- Webstorm: https://www.jetbrains.com/help/webstorm/eslint.html#ws_eslint_configure_run_eslint_on_save

### Testing

We use **Jest** for unit tests. Open the `*.spec.js` files for examples.

You must run the test with `npm run test` after each `git pull` and before each `git commit`.

If the tests do not pass after a `git pull`, either your environment is broken or someone made a mistake.

If your tests passed after the previous `git pull` but do not pass anymore after your changes, and you want to `git commit`, please fix the tests before doing so.

### Parsing

If you simply want to parse a TOSCA file, then follow this instructions:
* Write a javascript script to parse a file like in the example below which we will name parse_file.js

```js
import {Parser} from "../parser/parse.js";

// Provide the relative path to the tosca file to parse.
const parser = new Parser(new NodeJsFileManager());
const result = Parser.parse('./tests/data_manual/ToscaNextcloud.yml');
console.log(result);
```

### Compilation

TOSCA is not just parsed: There are extra steps such as type resolution or substitution.

See `src/compilation.js:compile`

### Update the grammar

To update the grammar, there are 2 methods:
* modify tosca_1_3.yaml
* create a new tosca_x.yaml file

In both cases, you should preprocess the file to generate a new tosca_x.js file that will be used to parse. Otherwise it will preprocess it at every run.

To preprocess, you have to follow these steps:
* Run this
```js
import { preprocess } from 'lidy-js/parser/node_parse.js';
preprocess('./schemas/___your_schema_here___.yaml');
```
* In the output file, modify the path used to import in the new generated file by "lidy-js"
```js
import { parse as parse_input } from "lidy-js"
```
* Replace imports if necessary in Toscator's code.

### Prerequisites

Tested with:
- **node** v18.13.0
- **npm** 9.2.0

May work with other versions.

## Built With

* [Tosca 1.0](http://docs.oasis-open.org/tosca/TOSCA-Simple-Profile-YAML/v1.3/TOSCA-Simple-Profile-YAML-v1.0.pdf) - OASIS Tosca 1.0 documentation
* [Tosca 1.3](http://docs.oasis-open.org/tosca/TOSCA-Simple-Profile-YAML/v1.0/TOSCA-Simple-Profile-YAML-v1.3.pdf) - OASIS Tosca 1.3 documentation 

# To-Do

- Check "TODO" in each file, in comments.
- Write tests for what is not tested yet.
- Parsing
  - (unknown state) ??
- Types
  - Work in progress, see below.
- Substitution
  - (unknown state) ??
- Orchestration
  - nothing done yet


- Refactor
  - ToscaImport and file loading is unclear (path management)


- Implement the specification:
  - Open `tests/unit/spec_examples/spec_examples.spec.js`
  - Uncomment tests (check the file: some examples *may* not be valid)
  - Implement until they pass.
  - Write for each example a unit test to verify that the result is exact (and not just that it does not crash)
  - Repeat until everything is implemented.


- Types inheritance
  - What about TOSCA types defined by the specification? (ie. tosca.nodes.*)

| Type         | Feature | Unit test | Integration test (YAML) | Comment         |
|--------------|---------|-----------|-------------------------|-----------------|
| Data         |         |           |                         |                 |
| Artifact     |         |           |                         |                 |
| Capabilities |         |           |                         |                 |
| Requirement  |         |           |                         |                 |
| Relationship |         |           |                         |                 |
| Interface    |         |           |                         |                 |
| Group        |         |           |                         |                 |
| Policy       |         |           |                         |                 |
| Node         | wip     | x         | wip                     | see table below |

 **Node Type** Inheritance

  | Field        | Feature | Unit test | Integration test (YAML) | Comment                           |
  |--------------|---------|-----------|-------------------------|-----------------------------------|
  | properties   | x       | x         | x                       |                                   |
  | capabilities | x       | x         | x                       |                                   |
  | attributes   | x       | x         | x                       |                                   |
  | interfaces   | x       | x         | x                       |                                   |
  | requirements | ?       | x         |                         | what is the expected behavior ?   |
  | artifacts    | ?       | x         |                         | what is the expected behavior ?   |
