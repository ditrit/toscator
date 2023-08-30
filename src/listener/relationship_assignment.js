import { ToscaRelationshipAssignment } from '../model/relationship_assignment.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_relationship_assignment(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaRelationshipAssignment, { type: parsed_rule.value }, parsed_rule);
    } else {
      const interfaces = listener_helpers.propertyMapofHelper('interfaces', parsed_rule);
      const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
      validateCreateAndRegister(ToscaRelationshipAssignment, {
        type: parsed_rule.value.type?.value,
        interfaces,
        properties,
      }, parsed_rule);
    }
  },
};
