import { newToscaPropertyFilter } from "../model/property_filter.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";
import { ToscaConstraint, newToscaConstraintEqual } from "../model/constraint.js";

export default {
    exit_properties_filter(parsed_rule) {
        parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
    },

    exit_property_filter(parsed_rule) {
        for (const property_name in parsed_rule?.value) {
            if (parsed_rule?.value[property_name].value instanceof Array) {
                const values = [];
                let constraints = [];
                parsed_rule?.value[property_name].value.forEach(element => {
                    if (element.tosca && element.tosca instanceof ToscaConstraint) {
                        constraints.push(element.tosca);
                    } else {
                        values.push(element);
                    }
                });
                if (constraints.length === 0) {
                    /**
                     * I believe that we could do simpler since we can't have several equal
                     * constraints for one property, that wouldn't make sense. Therefore
                     * there can't be a list of more than one element of values and I even think
                     * that there should never be a list of values since you should just write it
                     * in a single line
                     */ 
                    constraints = []
                    values.forEach(val => {
                        const type = val.type;
                        let value;
                        if (type == "list") {
                            value = val.value.map(v => v.tosca ? v.tosca : v.value)
                        } else {
                            value = val.tosca ? val.tosca : val.value
                        }
                        constraints.push(
                            newToscaConstraintEqual({
                                operator: "equal",
                                type: type,
                                value: value
                            }, parsed_rule)
                        );
                    });
                    newToscaPropertyFilter({
                        name: property_name,
                        constraints: constraints
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
                    constraints: [parsed_rule.value[property_name].tosca]
                }, parsed_rule);
            // if a value is given then it is interpreted as an equal constraint
            } else { 
                const type = parsed_rule.value[property_name].type;
                let value;
                if (type == "list") {
                    value = [];
                    for (const node in parsed_rule.value[property_name].value) {
                        value.push(parsed_rule.value[property_name].value[node].value);
                    }
                } else {
                    value = parsed_rule.value[property_name].tosca
                        ? parsed_rule.value[property_name].tosca
                        : parsed_rule.value[property_name].value;
                }

                const constraints = [
                    newToscaConstraintEqual({
                        operator: "equal",
                        type: type,
                        value: value
                    }, parsed_rule)
                ];

                newToscaPropertyFilter({
                    name: property_name,
                    constraints: constraints
                }, parsed_rule);
            }
        }
    }
}