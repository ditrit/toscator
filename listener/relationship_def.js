import { newToscaRelationshipDef } from "../model/relationship_def.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_relationship_def(parsed_rule) {
        if (typeof parsed_rule.value === "string") {
            newToscaRelationshipDef({type: parsed_rule.value}, parsed_rule);
        } else {
            const interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);
            newToscaRelationshipDef({
                type: parsed_rule.value,
                interfaces: interfaces
            }, parsed_rule);
        }
    }
}