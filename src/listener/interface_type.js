import { newToscaInterfaceType } from '../model/interface_type.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {
    exit_interface_types(parsed_rule) {
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca.setId(
                key,
                parsed_rule,
                'interface_types'
            );
        }
    },

    exit_interface_type(parsed_rule) {
        const inputs = listener_helpers.propertyMapofHelper('inputs', parsed_rule);
        const operations = listener_helpers.propertyMapofHelper('operations', parsed_rule);
        const notifications = listener_helpers.propertyMapofHelper('notifications', parsed_rule);
        newToscaInterfaceType(
            {
                derived_from: parsed_rule.value.derived_from?.value,
                version: parsed_rule.value.version?.tosca,
                description: parsed_rule.value.description?.value,
                metadata: parsed_rule.value.metadata?.tosca,
                inputs: inputs,
                operations: operations,
                notifications: notifications
            },
            parsed_rule
        );
    },
};
