import { ToscaParameter } from '../model/parameter.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_input_parameters(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_input_parameter(parsed_rule) {
    const constraints = listener_helpers.propertyListofHelper('constraints', false, parsed_rule);
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
