export default {
   exit_property_assignments(parsed_rule) {
      parsed_rule.tosca = parsed_rule.value;
   },

   exit_attribute_assignments(parsed_rule) {
      parsed_rule.tosca = parsed_rule.value;
   },
   exit_input_assignments(parsed_rule) {
      parsed_rule.tosca = parsed_rule.value;
   },
};
