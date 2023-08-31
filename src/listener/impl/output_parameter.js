import input_parameter from './input_parameter.js';

// output_parameter = input_parameter according to the documentation
export default {
  exit_output_parameters(parsed_rule) {
    input_parameter.exit_input_parameters(parsed_rule);
  },

  exit_output_parameter(parsed_rule) {
    input_parameter.exit_input_parameter(parsed_rule);
  },
};
