import { newToscaInterface_type } from "../model/interface_type.js";

export default {
    exit_interface_types(parsed_rule) {
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca.setId(key, parsed_rule, "interface_types")
        }
    },

    exit_interface_type(parsed_rule) {
        newToscaInterface_type({
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.tosca,
            metadata: parsed_rule.value.metadata?.tosca,
        }, 
            parsed_rule)
    }
}