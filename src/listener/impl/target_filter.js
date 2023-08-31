import { validateCreateAndRegister } from '#src/models.js';
import { ToscaTargetFilter } from '#src/model/target_filter.js';

export default {
  exit_target_filter(parsed_rule) {
    validateCreateAndRegister(ToscaTargetFilter, {
      node: parsed_rule.value.node?.value,
      requirement: parsed_rule.value.requirement?.value,
      capability: parsed_rule.value.capability?.value,
    }, parsed_rule);
  },
};
