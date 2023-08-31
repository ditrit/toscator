import { ToscaRelationshipAssignment } from '#src/model/relationship/relationship_assignment.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_relationship_assignment(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(
        ToscaRelationshipAssignment,
        { type: parsed_rule.value },
        parsed_rule,
      );
    } else {
      const interfaces = propertyMapofHelper('interfaces', parsed_rule);
      const properties = propertyMapofHelper('properties', parsed_rule);
      validateCreateAndRegister(ToscaRelationshipAssignment, {
        type: parsed_rule.value.type?.value,
        interfaces,
        properties,
      }, parsed_rule);
    }
  },
};
