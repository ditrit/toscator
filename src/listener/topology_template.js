import { TopologyTemplate } from "../model/topology_tempate.js";

export default {
    exit_topoligy_template(parsed_rule) {
        if (this.checkTopologyTemplate(parsed_rule)) {
            parsed_rule.value.tosca = new TopologyTemplate(
                this.formatTopologyTemplate(parsed_rule),
                parsed_rule
            );
        }
    },

    formatTopologyTemplate(parsed_rule) {
        // let inputs = new Map();
        // let outputs = new Map();
        // let node_templates = new Map();
        // let relationship_templates = new Map();
        // let groups = new Map();
        // let policies = new Map();
        // let workflows = new Map();

        // for (const key in parsed_rule.value.inputs?.value) {
        //     inputs[key] = parsed_rule.value.inputs.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.outputs?.value) {
        //     outputs[key] = parsed_rule.value.outputs.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.node_templates?.value) {
        //     node_templates[key] = parsed_rule.value.node_templates.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.relationship_templates?.value) {
        //     relationship_templates[key] = parsed_rule.value.relationship_templates.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.groups_def?.value) {
        //     groups[key] = parsed_rule.value.group_defs.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.policy_defs?.value) {
        //     policies[key] = parsed_rule.value.policy_defs.value[key].tosca;
        // }
        // for (const key in parsed_rule.value.imperative_worflows_defs?.value) {
        //     workflows[key] = parsed_rule.value.imperative_worflows_defs.value[key].tosca;
        // }

        return {
            description: parsed_rule.value.value.desscription?.value,
            // inputs,
            // outputs,
            // node_templates,
            // relationship_templates,
            // groups,
            // policies,
            // substitution_mappings: parsed_rule.value.substitution_mappings.tosca,
            // workflows
        };
    },

    checkTopologyTemplate(parsed_rule) {
        if (
            !(
                typeof parsed_rule.value === "string" ||
                typeof parsed_rule.value?.desscription?.value === "string"
            )
        ) {
            parsed_rule.ctx.typeError(
                parsed_rule.current,
                "Incorrect definition for TopologyTemplate"
            );
            return false;
        }
        return true;
    },
};
