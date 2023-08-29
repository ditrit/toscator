import { validateCreateAndRegister } from '#src/models.js';
import {
  ToscaConstraintEquals,
  ToscaConstraintGreaterOrEqual,
  ToscaConstraintGreaterThan,
  ToscaConstraintInRange,
  ToscaConstraintLength,
  ToscaConstraintLessOrEqual,
  ToscaConstraintLessThan,
  ToscaConstraintMaxLength,
  ToscaConstraintMinLength,
  ToscaConstraintPattern,
  ToscaConstraintSchema,
  ToscaConstraintValidValues,
} from '#src/model/constraint.js';

export default {
  exit_constraints(parsed_rule) {
    if (parsed_rule) {
      const constraints = [];
      parsed_rule.value.map((ele) => constraints.push(ele.tosca));
      constraints.source = parsed_rule;
      parsed_rule.tosca = constraints;
    }
  },

  exit_constraint(parsed_rule) {
    let operator; let type; let
      value;
    for (const key in parsed_rule?.value) {
      operator = key;
      type = parsed_rule.value[key].type;
      if (type == 'list') {
        value = [];
        for (const node in parsed_rule.value[key].value) {
          value.push(parsed_rule.value[key].value[node].tosca
            ? parsed_rule.value[key].value[node].tosca
            : parsed_rule.value[key].value[node].value);
        }
      } else {
        value = parsed_rule.value[key].tosca
          ? parsed_rule.value[key].tosca
          : parsed_rule.value[key].value;
      }
    }

    switch (operator) {
      case 'equal':
        validateCreateAndRegister(ToscaConstraintEquals, { operator, type, value }, parsed_rule);
        break;
      case 'greater_than':
        validateCreateAndRegister(
          ToscaConstraintGreaterThan,
          { operator, type, value },
          parsed_rule,
        );
        break;

      case 'greater_or_equal':
        validateCreateAndRegister(
          ToscaConstraintGreaterOrEqual,
          { operator, type, value },
          parsed_rule,
        );
        break;

      case 'less_than':
        validateCreateAndRegister(ToscaConstraintLessThan, { operator, type, value }, parsed_rule);
        break;

      case 'less_or_equal':
        validateCreateAndRegister(
          ToscaConstraintLessOrEqual,
          { operator, type, value },
          parsed_rule,
        );
        break;

      case 'in_range':
        validateCreateAndRegister(ToscaConstraintInRange, { operator, type, value }, parsed_rule);
        break;

      case 'valid_values':
        validateCreateAndRegister(
          ToscaConstraintValidValues,
          { operator, type, value },
          parsed_rule,
        );
        break;

      case 'length':
        validateCreateAndRegister(ToscaConstraintLength, { operator, type, value }, parsed_rule);
        break;
      case 'min_length':
        validateCreateAndRegister(ToscaConstraintMinLength, { operator, type, value }, parsed_rule);
        break;
      case 'max_length':
        validateCreateAndRegister(ToscaConstraintMaxLength, { operator, type, value }, parsed_rule);
        break;
      case 'pattern':
        validateCreateAndRegister(ToscaConstraintPattern, { operator, type, value }, parsed_rule);
        break;
      case 'schema':
        validateCreateAndRegister(ToscaConstraintSchema, { operator, type, value }, parsed_rule);
        break;
    }
  },
};
