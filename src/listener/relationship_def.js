import { ToscaRelationshipDef } from '#src/model/relationship_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_relationship_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaRelationshipDef, { type: parsed_rule.value }, parsed_rule);
    } else {
      const interfaces = propertyMapofHelper('interfaces', parsed_rule);
      validateCreateAndRegister(ToscaRelationshipDef, {
        type: parsed_rule.value,
        interfaces,
      }, parsed_rule);
    }
  },
};
