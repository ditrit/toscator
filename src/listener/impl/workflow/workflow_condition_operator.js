import {
  ToscaWorkflowConditionOperatorAnd,
  ToscaWorkflowConditionOperatorAssert,
  ToscaWorkflowConditionOperatorNot,
  ToscaWorkflowConditionOperatorOr,
} from '#src/model/workflow/workflow_condition_operator.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_workflow_condition_operator(parsed_rule) {
    if (parsed_rule) {
      const operator_values = ['and', 'or', 'not', 'assert'];
      let operator;
      let conditions = [];
      const assertions = new Map();

      for (const object in parsed_rule.value) { // object is either a string (=attribute) or an operator
        if (object in operator_values) {
          operator = object;
          conditions = parsed_rule.value[object].tosca;
        } else {
          operator = 'and';
          assertions[object] = parsed_rule.value[object].tosca;
        }

        switch (operator) {
          case 'and':
            validateCreateAndRegister(
              ToscaWorkflowConditionOperatorAnd,
              { operator, conditions, assertions },
              parsed_rule,
            );
            break;
          case 'or':
            validateCreateAndRegister(
              ToscaWorkflowConditionOperatorOr,
              { operator, conditions, assertions },
              parsed_rule,
            );
            break;
          case 'not':
            validateCreateAndRegister(
              ToscaWorkflowConditionOperatorNot,
              { operator, conditions, assertions },
              parsed_rule,
            );
            break;
          case 'assert':
            validateCreateAndRegister(
              ToscaWorkflowConditionOperatorAssert,
              { operator, conditions, assertions },
              parsed_rule,
            );
            break;
        }
      }
    }
  },
};
