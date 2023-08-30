import { ToscaCondition } from '../model/condition.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_condition(parsed_rule) {
    if (parsed_rule.tosca) {
      validateCreateAndRegister(ToscaCondition, { constraint: parsed_rule.tosca }, parsed_rule);
    } else {
      validateCreateAndRegister(ToscaCondition, {
        constraint: parsed_rule.value.constraint?.tosca,
        period: parsed_rule.value.period?.tosca,
        evaluations: parsed_rule.value.evaluations?.value,
        method: parsed_rule.value.method?.value,
      }, parsed_rule);
    }
  },
};
