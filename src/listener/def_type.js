import { newDefType } from '../model/def_type.js';

export default function deal_deftype(parsed_rule) {
    const type = parsed_rule.value.type ? parsed_rule.value.type.value : null;
    const description = parsed_rule.value.description
        ? parsed_rule.value.description.value
        : null;
    const constraints = parsed_rule.value.constraints
        ? parsed_rule.value.constraints.tosca
        : null;
    if (!parsed_rule.value.entry_schema) {
        return newDefType(
            {
                type,
                constraints,
                description,
            },
            parsed_rule
        );
    }
    return newDefType(
        {
            type,
            constraints,
            entry_schema: deal_deftype(parsed_rule.value.entry_schema),
            description,
        },
        parsed_rule
    );
}
