import { newToscaDataType } from "../model/data_type.js";

export default {
    exit_data_types(parsed_rule) {
        for (const key in parsed_rule.value) {
            parsed_rule.value[key].tosca.setId(key, parsed_rule, "data_types")
        }
    },

    exit_data_type(parsed_rule) {
        let properties = new Map();
        for (const key in parsed_rule.value.properties.value) {
            properties[key] = parsed_rule.value.properties.value[key].tosca
        }
        newToscaDataType({
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.tosca,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
        }, 
            parsed_rule)
    }
}