import { ToscaGroupDef } from '#src/model/group/group_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_group_defs(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },

  exit_group_def(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const members = propertyListofHelper('members', false, parsed_rule);

    validateCreateAndRegister(ToscaGroupDef, {
      type: parsed_rule.value.type?.value,
      description: parsed_rule.value.description?.value,
      properties,
      members,
      metadata: parsed_rule.value.metadata?.tosca,
    }, parsed_rule);
  },
};
