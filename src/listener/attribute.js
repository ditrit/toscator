import { newToscaAttribute } from '../model/attribute.js';

export default {
    exit_attributes(parsed_rule) {
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca?.setName(key);
        }
    },

    exit_attribute(parsed_rule) {
        newToscaAttribute(
            {
                type: parsed_rule.value.type?.value,
                description: parsed_rule.value.description?.value,
                default: (parsed_rule.value.default?.tosca) ? parsed_rule.value.default?.tosca : parsed_rule.value.default?.value,
                status: parsed_rule.value.status?.value,
                entry_schema: parsed_rule.value.entry_schema?.tosca,
                key_schema: parsed_rule.value.key_schema?.tosca
            },
            parsed_rule
        );
    },
};
