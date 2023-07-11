import { newToscaCondition } from "../model/condition.js";

export default {
    exit_condition(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule condition:+++++++++++++++++++++++++++++++++")
        if (parsed_rule.tosca) {
            newToscaCondition({constraint: parsed_rule.tosca}, parsed_rule);
        } else {
            //console.log(parsed_rule)
            newToscaCondition({
                constraint: parsed_rule.value.constraint?.tosca,
                period: parsed_rule.value.period?.tosca,
                evaluations: parsed_rule.value.evaluations?.value,
                method: parsed_rule.value.method?.value
            }, parsed_rule);
        }
        //console.log(parsed_rule.tosca)
    }
}