import RelationshipAssignment from "../model/RelationshipAssignment";

export default {
   exit_relationship_assignment(parsed_rule) {
      const properties = parsed_rule.value.properties.map(
         (property) => property.tosca
      );
      const relationshipAssignment = new RelationshipAssignment({
         properties: properties,
         type: parsed_rule.value.type,
      });
      parsed_rule.tosca = relationshipAssignment;
   },
};
