import { newToscaSchemaDef } from "../model/schema_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_schema_def(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule schema_def:+++++++++++++++++++++++++++++++++");
        if (typeof parsed_rule.value === "string") {
            newToscaSchemaDef({type: parsed_rule.value}, parsed_rule);
        } else {
            const constraints = listener_helpers.propertyListofHelper("constraints", false, parsed_rule);
            newToscaSchemaDef({
                type: parsed_rule.value.type?.value,
                description: parsed_rule.value.description?.value,
                constraints: constraints,
                entry_schema: parsed_rule.value.entry_schema?.tosca,
                key_schema: parsed_rule.value.key_schema?.tosca
            }, parsed_rule);
        }
        
    }
}