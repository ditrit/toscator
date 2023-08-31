// node .\tests\data_manual\test_substitution\test_property_filter\testPropertyFilter.js

import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { substitution } from '#src/substitution/substitution.js';
import { Parser } from '#src/parser/parse.js';

const parser = new Parser(new NodeJsFileManager());

const abs_st = parser.parse('./tests/data_manual/test_substitution/test_property_filter_passFilter/abstractNode.yml');
const in_range = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[0].num_cpus;
const greater_or_equal = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[1].mem_size;
const equal = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[2].ppty_equal;
const greater = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[3].ppty_greater;
const greater_or_equal_2 = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[4].ppty_greater_or_equal;
const less = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[5].ppty_less;
const less_or_equal = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[6].ppty_less_or_equal;
const valid_values = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[7].ppty_valid;
const in_range_2 = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[8].ppty_in_range;
const valid_values_2 = abs_st.topology_template.node_templates.get('mysql_compute').node_filter.properties[9].ppty_valid_2;

// console.log(greater_or_equal_2);

const concrete_st = parser.parse('./tests/data_manual/test_substitution/test_property_filter_passFilter/concreteNode.yml');
const num_cpus = concrete_st.topology_template.node_templates.get('compute').properties.get('num_cpus');
const mem_size = concrete_st.topology_template.node_templates.get('compute').properties.get('mem_size');
const os = concrete_st.topology_template.node_templates.get('compute').properties.get('os');
const disk_size = concrete_st.topology_template.node_templates.get('compute').properties.get('disk_size');

// console.log(num_cpus)

console.log(in_range.passFilter(num_cpus));
console.log(greater_or_equal.passFilter(mem_size));
console.log(equal.passFilter(os));
console.log(greater.passFilter(num_cpus));
console.log(greater_or_equal_2.passFilter(num_cpus));
console.log(less.passFilter(num_cpus));
console.log(less_or_equal.passFilter(num_cpus));
console.log(valid_values.passFilter(os));
console.log(in_range_2.passFilter(mem_size));
console.log(valid_values_2.passFilter(disk_size));
