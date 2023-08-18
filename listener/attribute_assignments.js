import listener_helpers from "./listener_helpers/listener_helpers.js"

export default {
    exit_attribute_assignments(parsed_rule) {
        listener_helpers.defMapofHelperSetname(parsed_rule);
    }
}