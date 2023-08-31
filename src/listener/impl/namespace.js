import { ToscaNamespace } from '#src/model/namespace.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_namespace(parsed_rule) {
    const namespace = (parsed_rule.value) ? parsed_rule.value : '';
    parsed_rule.ctx.prog.namespace = validateCreateAndRegister(ToscaNamespace, namespace, parsed_rule);
  },
};
