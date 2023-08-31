import { ToscaParameter } from '#src/model/parameter/parameter.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_input_parameters(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_input_parameter(parsed_rule) {
    const constraints = propertyListofHelper('constraints', false, parsed_rule);
    validateCreateAndRegister(ToscaParameter, {
      type: parsed_rule.value.type?.value,
      description: parsed_rule.value.description?.value,
      constraints,
      required: parsed_rule.value.required?.value,
      default: (parsed_rule.value.default?.tosca) ? parsed_rule.value.default?.tosca : parsed_rule.value.default?.value,
      status: parsed_rule.value.status?.value,
      entry_schema: parsed_rule.value.entry_schema?.tosca,
      value: (parsed_rule.value.value?.tosca) ? parsed_rule.value.value?.tosca : parsed_rule.value.value?.value,
      key_schema: parsed_rule.value.key_schema?.tosca,
      metadata: parsed_rule.value.metadata?.tosca,
    }, parsed_rule);
  },
};
