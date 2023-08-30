import {
   newToscaConstraintEqual,
   newToscaConstraintGreaterThan,
   newToscaConstraintInRange,
   newToscaConstraintLength,
   newToscaConstraintLessThan,
   newToscaConstraintMaxLength,
   newToscaConstraintMinLength,
   newToscaConstraintPattern,
   newToscaConstraintSchema,
   newToscaConstraintValidValues,
   newToscaConstraintLessOrEqual,
   newToscaConstraintGreaterOrEqual,
} from "../model/constraint.js";

export default {
   exit_constraints(parsed_rule) {
      if (parsed_rule) {
         let constraints = [];
         parsed_rule.value.map((ele) => constraints.push(ele.tosca));
         constraints.source = parsed_rule;
         parsed_rule.tosca = constraints;
      }
   },

   exit_constraint(parsed_rule) {
      let operator, type, value;
      for (const key in parsed_rule?.value) {
         operator = key;
         type = parsed_rule.value[key].type;
         if (type == "list") {
            value = [];
            for (const node in parsed_rule.value[key].value) {
               value.push(parsed_rule.value[key].value[node].tosca
                  ? parsed_rule.value[key].value[node].tosca
                  : parsed_rule.value[key].value[node].value );
            }
         } else {
            value = parsed_rule.value[key].tosca
               ? parsed_rule.value[key].tosca
               : parsed_rule.value[key].value;
         }
      }

      switch (operator) {
         case "equal":
            newToscaConstraintEqual({ operator, type, value }, parsed_rule);
            break;
         case "greater_than":
            newToscaConstraintGreaterThan(
               { operator, type, value },
               parsed_rule
            );
            break;

         case "greater_or_equal":
            newToscaConstraintGreaterOrEqual(
               { operator, type, value },
               parsed_rule
            );
            break;

         case "less_than":
            newToscaConstraintLessThan({ operator, type, value }, parsed_rule);
            break;

         case "less_or_equal":
            newToscaConstraintLessOrEqual(
               { operator, type, value },
               parsed_rule
            );
            break;

         case "in_range":
            newToscaConstraintInRange({ operator, type, value }, parsed_rule);
            break;

         case "valid_values":
            newToscaConstraintValidValues(
               { operator, type, value },
               parsed_rule
            );
            break;

         case "length":
            newToscaConstraintLength({ operator, type, value }, parsed_rule);
            break;
         case "min_length":
            newToscaConstraintMinLength({ operator, type, value }, parsed_rule);
            break;
         case "max_length":
            newToscaConstraintMaxLength({ operator, type, value }, parsed_rule);
            break;
         case "pattern":
            newToscaConstraintPattern({ operator, type, value }, parsed_rule);
            break;
         case "schema":
            newToscaConstraintSchema({ operator, type, value }, parsed_rule);
            break;
      }
   },
};
