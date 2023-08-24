import { newToscaOperationImplementation } from '../model/operation_implementation.js';
import { parse } from '../schemas/tosca_1_3.js';

export default {
    exit_operation_implementation(parsed_rule) {
        if (typeof parsed_rule.value === 'string') {
            newToscaOperationImplementation({ primary: parsed_rule.value }, parsed_rule);
        } else {
            const dependencies = parsed_rule.value.dependencies?.value.map((v) => v.value);
            newToscaOperationImplementation(
                {
                    primary: typeof parsed_rule.value.primary?.value === 'string' ? parsed_rule.value.primary?.value : parsed_rule.value.primary?.tosca,
                    dependencies: dependencies,
                    timeout: parsed_rule.value.timeout?.value,
                    operation_host: parsed_rule.value.operation_host?.value

                },
                parsed_rule
            );
        }
    },
};