import { newToscaTargetFilter } from '../model/target_filter.js';

export default {
    exit_target_filter(parsed_rule) {
        newToscaTargetFilter({
            node: parsed_rule.value.node?.value,
            requirement: parsed_rule.value.requirement?.value,
            capability: parsed_rule.value.capability?.value,
        }, parsed_rule);
    }
};