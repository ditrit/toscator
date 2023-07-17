import { newToscaRelationshipAssignment } from "../model/relationship_assignment.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_relationship_assignment(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule relationship_assignment:+++++++++++++++++++++++++++++++++");
        if (typeof parsed_rule.value === "string") {
            newToscaRelationshipAssignment({type: parsed_rule.value}, parsed_rule);
        } else {
            const interfaces = listener_helpers.propertyMapofHelper("interfaces", parsed_rule);
            const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
            newToscaRelationshipAssignment({
                type: parsed_rule.value.type?.value,
                interfaces: interfaces,
                properties: properties
            }, parsed_rule);
        }
    }
}