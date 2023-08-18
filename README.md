# toscator

Tosca 1.3 compiler

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
* clone the repository 

### Parsing

If you simply want to parse a Tosca file, then follow this instructions:
* Write a javascript script to parse a file like in the example below which we will name parse_file.js

```
import {parse} from "../parser/parse.js";

// provide the relative path to the tosca file to parse
const res = parse('./tests/data_manual/test_parsing/testInterfaceMapping.yml');
console.log(res);
```

* And then run the script. Note that in the example above, relative paths are used therefore check the working directory. For this example I used toscator\ as the working directory.

```
node parse_file.js
```

### Substitution

If you want to substitute an abstract node with a topology_template, you can write the following script:

```
import { mappingSubstitution } from "../../../../substitution/mapping_substitution.js";
import { parse } from "../../../../parser/parse.js";

// ----------- parse the patterns and the service template with the abstract node -----------
// abstract node
const abs_st = parse("./tests/data_manual/test_substitution/test_mapping_substitution/abstractNode.yml");
const mysql_compute = abs_st.topology_template.node_templates.get("mysql_compute");

// patterns
const concrete_st = parse("./patterns/pattern1");


// ------------------- substitute the abstract node by a topology template -------------------

// abs_st is the service template with the abstract node
// mysql_compute is the abstract node
// [concrete_st] is the list of patterns used to substitute the abstract node
mappingSubstitution(abs_st, mysql_compute, [concrete_st]);

console.log(abs_st.topology_template)
console.log(abs_st.topology_template.node_templates)
```

### Update the grammar

To update the grammar, there are 2 methods:
* modify tosca_1_3.yaml
* create a new tosca_x.yaml file

In both cases, you should preprocess the file to generate a new tosca_x.js file that will be used to parse. Otherwise it will preprocess it at every run.

To preprocess, you have to follow these steps:
* modify the preprocess.js file so that it preprocesses the correct file if you have created a new file
```
preprocess("./schemas/tosca_x.yaml");
```
* run preprocess.js
```
node .\preprocess.js
```
* modify the path used to import in the new generated file by "lidy-js"
```
import { parse as parse_input } from "lidy-js"
```
* modify the import of the grammar file in parser\prog_init.js 
```
import { parse as parse_tosca } from "../schemas/tosca_x.js";
```

### Prerequisites

You can either use it on a navigator or have **node** v18.16.0 (this one works for sure, I didn't try other versions) installed.

## Built With

* [Tosca 1.0](http://docs.oasis-open.org/tosca/TOSCA-Simple-Profile-YAML/v1.3/TOSCA-Simple-Profile-YAML-v1.0.pdf) - OASIS Tosca 1.0 documentation
* [Tosca 1.3](http://docs.oasis-open.org/tosca/TOSCA-Simple-Profile-YAML/v1.0/TOSCA-Simple-Profile-YAML-v1.3.pdf) - OASIS Tosca 1.3 documentation 