import { ToscaGroupDef } from '../model/group_def.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_group_defs(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
  },

  exit_group_def(parsed_rule) {
    const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
    const members = listener_helpers.propertyListofHelper('members', false, parsed_rule);

    validateCreateAndRegister(ToscaGroupDef, {
      type: parsed_rule.value.type?.value,
      description: parsed_rule.value.description?.value,
      properties,
      members,
      metadata: parsed_rule.value.metadata?.tosca,
    }, parsed_rule);
  },
};
