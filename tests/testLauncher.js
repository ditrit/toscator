import {
    parse
} from "../parser/parse.js";

let res = parse("./data/import/loop_import_test.yml")

if (res.errors.length != 0) {
    console.log("TOSCA ERROR : ");
    res.errors.forEach(e => console.log(e))
} else {
    // console.log(res.service_templates[0].imports);
    res.service_templates.forEach(st => {
        console.log(st);
    });
}