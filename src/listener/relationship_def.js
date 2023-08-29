import { ToscaRelationshipDef } from '../model/relationship_def.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_relationship_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaRelationshipDef, { type: parsed_rule.value }, parsed_rule);
    } else {
      const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);
      validateCreateAndRegister(ToscaRelationshipDef, {
        type: parsed_rule.value,
        interfaces,
      }, parsed_rule);
    }
  },
};
