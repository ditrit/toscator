import { newToscaNamespace } from "../model/namespace.js"

export default {
    exit_namespace(parsed_rule) {
        let namespace = (parsed_rule.value) ? parsed_rule.value : ""
        parsed_rule.ctx.prog.namespace = newToscaNamespace(namespace, parsed_rule);
    }
}