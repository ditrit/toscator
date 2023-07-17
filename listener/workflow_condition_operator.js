import { newToscaWorkflowConditionOperatorAnd,
newToscaWorkflowConditionOperatorAssert,
newToscaWorkflowConditionOperatorNot,
newToscaWorkflowConditionOperatorOr
} from "../model/workflow_condition_operator.js";


export default {
    exit_workflow_condition_operator(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule wf_condition_operator:+++++++++++++++++++++++++++++++++")
        if (parsed_rule) {
            const operator_values = ["and", "or", "not", "assert"];
            let operator;
            let conditions = [];
            let assertions = new Map();
            // parsed_rule.value = _oneOf: [_mapF: [and, or, assert, not], _mapOf: {string: constraint}]

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