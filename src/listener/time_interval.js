import { newToscaTimeInterval } from '../model/time_interval.js';

export default {
    exit_time_interval(parsed_rule) {
        newToscaTimeInterval({
            start_time: parsed_rule.value.start_time?.value,
            end_time: parsed_rule.value.end_time?.value
        }, parsed_rule);
    }
};