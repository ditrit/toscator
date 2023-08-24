import { newToscaRequirementAssignment } from '../model/requirement_assignment.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

export default {exit_requirement_assignment, exit_requirement_assignments};

function exit_requirement_assignments(parsed_rule) {
    parsed_rule.tosca = listener_helpers.defListofHelper(true, parsed_rule);
}

function exit_requirement_assignment(parsed_rule) {
    for (const requirement_name in parsed_rule?.value) {
        if (typeof parsed_rule.value[requirement_name].value === 'string') {
            newToscaRequirementAssignment({node: parsed_rule.value[requirement_name].value}, parsed_rule);
        } else {
            newToscaRequirementAssignment({
                node: parsed_rule.value[requirement_name].value.node?.value,
                relationship: parsed_rule.value[requirement_name].value.relationship?.value,
                capability: parsed_rule.value[requirement_name].value.capability?.value,
                occurrences: parsed_rule.value[requirement_name].value.occurrences?.value,
                node_filter: parsed_rule.value[requirement_name].value.node_filter?.tosca
            }, parsed_rule);
        }
    }
}