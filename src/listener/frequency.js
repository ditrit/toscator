import { newtoscaFrequency } from '../model/tosca_freqeuncy.js';

export default {
    exit_frequency(parsed_rule) {
        newtoscaFrequency(
            {
                type: 'frequency',
                value: parsed_rule?.value,
            },
            parsed_rule
        );
    },
};
