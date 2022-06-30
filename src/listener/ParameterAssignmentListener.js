import ParameterAssignment from "../model/ParamaterAssignement.js";

export default {
   exit_parameter_assignment(parsed_rule) {
      let parameterAssignement = new ParameterAssignment(
         this.formatParameterAssignment(parsed_rule),
         parsed_rule
      );
      parsed_rule.tosca = parameterAssignement;
   },

   formatParameterAssignment(parsed_rule) {
      if (typeof parsed_rule.value == "string") {
         return {
            type: "value",
            value: parsed_rule.tosca
               ? parsed_rule.tosca.value
               : parsed_rule.value,
         };
      }
      return {
         type: "value_expression",
         value: {
            key: Object.keys(parsed_rule.value)[0],
            value: parsed_rule.value[Object.keys(parsed_rule.value)[0]].value,
         },
      };
   },
};
