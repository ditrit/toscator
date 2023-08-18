import { newToscaWorkflowConditionOperatorAnd,
newToscaWorkflowConditionOperatorAssert,
newToscaWorkflowConditionOperatorNot,
newToscaWorkflowConditionOperatorOr
} from "../model/workflow_condition_operator.js";


export default {
    exit_workflow_condition_operator(parsed_rule) {
        if (parsed_rule) {
            const operator_values = ["and", "or", "not", "assert"];
            let operator;
            let conditions = [];
            let assertions = new Map();

            for (const object in parsed_rule.value) { //object is either a string (=attribute) or an operator
                if (object in operator_values) {
                    operator = object;
                    conditions = parsed_rule.value[object].tosca;
                } else {
                    operator = "and";
                    assertions[object] = parsed_rule.value[object].tosca;
                }

                switch (operator) {
                    case "and":
                        newToscaWorkflowConditionOperatorAnd({operator, conditions, assertions}, parsed_rule);
                        break;
                    case "or":
                        newToscaWorkflowConditionOperatorOr({operator, conditions, assertions}, parsed_rule);
                        break;
                    case "not":
                        newToscaWorkflowConditionOperatorNot({operator, conditions, assertions}, parsed_rule);
                        break;
                    case "assert":
                        newToscaWorkflowConditionOperatorAssert({operator, conditions, assertions}, parsed_rule);
                        break;
                }
            }
        }
        
    }
}