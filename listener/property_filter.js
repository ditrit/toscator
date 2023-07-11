import { newToscaPropertyFilter } from "../model/property_filter.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";
import { ToscaConstraint } from "../model/constraint.js";

export default {
    exit_properties_filter(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule properties_filter:+++++++++++++++++++++++++++++++++");
        //console.log(parsed_rule.value[0].tosca);
        parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
    },

    exit_property_filter(parsed_rule) {
        console.log("\n+++++++++++++++++++++++++++++++++parsed_rule property_filter:+++++++++++++++++++++++++++++++++");
        //console.log(parsed_rule?.value);
        for (const property_name in parsed_rule?.value) {
            if (parsed_rule?.value[property_name].value instanceof Array) {
                const values = [];
                const constraints = [];
                parsed_rule?.value[property_name].value.forEach(element => {
                    if (element.tosca && element.tosca instanceof ToscaConstraint) {
                        constraints.push(element.tosca);
                    } else {
                        values.push(element.value);
                    }
                });
                if (constraints.length === 0) {
                    newToscaPropertyFilter({
                        name: property_name,
                        values: values
                    }, parsed_rule);
                } else {
                    newToscaPropertyFilter({
                        name: property_name,
                        constraints: constraints
                    }, parsed_rule);
                }
            } else if (parsed_rule.value[property_name].tosca 
                && parsed_rule.value[property_name].tosca instanceof ToscaConstraint) {
                newToscaPropertyFilter({
                    name: property_name,
                    constraints: parsed_rule.value[property_name].tosca
                }, parsed_rule);
            } else {
                newToscaPropertyFilter({
                    name: property_name,
                    values: (parsed_rule.value[property_name].tosca)
                    ? parsed_rule.value[property_name].tosca
                    : parsed_rule.value[property_name].value
                }, parsed_rule);
            }
        }
    }
}