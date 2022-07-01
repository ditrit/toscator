import CapabilityAssignment from "../model/CapabilityAssignment";

export default {
   exit_capability_assignments(parsed_rule) {
      console.log("exit_capability_assignments");
   },

   exit_capability_assignment(parsed_rule) {
      const properties = parsed_rule.value.properties.map(
         (property) => property.tosca
      );
      const attributes = parsed_rule.value.attributes.map(
         (attribute) => attribute.tosca
      );
      const capabilityAssignment = new CapabilityAssignment(
         {
            properties: properties,
            attributes: attributes,
            occurences: parsed_rule.value.occurences,
         },
         parsed_rule.value.source
      );
      parsed_rule.tosca = capabilityAssignment;
   },
};
