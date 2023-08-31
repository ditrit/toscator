import { ToscaParameterAssignment } from '#src/model/parameter/parameter_assignment.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_parameter_assignment(parsed_rule) {
    if (parsed_rule.type === 'map') {
      validateCreateAndRegister(ToscaParameterAssignment, {
        description: parsed_rule.value.description?.value,
        value:
          (parsed_rule.value.value?.tosca)
            ? parsed_rule.value.value?.tosca
            : parsed_rule.value.value?.value,
      }, parsed_rule);
    } else {
      validateCreateAndRegister(
        ToscaParameterAssignment,
        { value: (parsed_rule.tosca) ? parsed_rule.tosca : parsed_rule.value },
        parsed_rule,
      );
    }
  },

  exit_attribute_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_property_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_input_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },
};
