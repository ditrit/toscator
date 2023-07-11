import listener_helpers from "./listener_helpers/listener_helpers.js"

export default {
    exit_attribute_assignments(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule attribute_assignments:+++++++++++++++++++++++++++++++++");
        // console.log(parsed_rule);
        listener_helpers.defMapofHelperSetname(parsed_rule);
    }
}