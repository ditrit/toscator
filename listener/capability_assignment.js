import { newToscaCapabilityAssignment } from "../model/capability_assignment.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
    exit_capability_assignments(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule capability_assignments:+++++++++++++++++++++++++++++++++");
        listener_helpers.defMapofHelperSetname(parsed_rule);
    },

    exit_capability_assignment(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule capability_assignment:+++++++++++++++++++++++++++++++++");
        const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
        const attributes = listener_helpers.propertyMapofHelper("attributes", parsed_rule);

        newToscaCapabilityAssignment({
            properties: properties,
            attributes: attributes,
            occurences: parsed_rule.value.occurences?.value
        }, parsed_rule);
    }
}