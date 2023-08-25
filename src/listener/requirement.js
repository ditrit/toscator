import { newToscaRequirement } from '../model/requirement.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_requirement_defs(parsed_rule) {
        const requirements = [];
        for (const key in parsed_rule.value) {
            const requirement_name = parsed_rule.value[key].tosca.name;
            delete parsed_rule.value[key].tosca.name;
            requirements.push({
                [requirement_name]: parsed_rule.value[key].tosca,
            });
        }
        requirements.source = parsed_rule;
        parsed_rule.tosca = requirements;
    },

    exit_requirement_def(parsed_rule) {
        for (const key in parsed_rule.value) {
            if (typeof parsed_rule.value[key].value === 'string') {
                newToscaRequirement(
                    { capability: parsed_rule.value[key].value, name: key },
                    parsed_rule
                );
            } else {
                newToscaRequirement(
                    {
                        capability: parsed_rule.value[key].value.capability?.value,
                        node: parsed_rule.value[key].value.node?.value,
                        relationship:
                     parsed_rule.value[key].value.relationship?.tosca,
                        occurences: parsed_rule.value[key].value.occurrences?.value,
                        name: key,
                    },
                    parsed_rule
                );
            }
        }
    },
};