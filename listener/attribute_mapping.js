import { newToscaAttributeMapping } from "../model/attribute_mapping.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {exit_attributes_mapping, exit_attribute_mapping}

function exit_attributes_mapping(parsed_rule) {
    listener_helpers.defMapofHelperSetname(parsed_rule);
}

function exit_attribute_mapping(parsed_rule) {
    console.log("\n+++++++++++++++++++++++++++++++++parsed_rule attribute_mapping:+++++++++++++++++++++++++++++++++")
    newToscaAttributeMapping({mapping: listener_helpers.propertyListofHelper("mapping", false, parsed_rule)}, parsed_rule);
}