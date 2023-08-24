import { newToscaBitrate } from '../model/tosca_bitrate.js';

export default {
    exit_bitrate(parsed_rule) {
        newToscaBitrate(
            {
                type: 'bitrate',
                value: parsed_rule?.value,
            },
            parsed_rule
        );
    },
};
