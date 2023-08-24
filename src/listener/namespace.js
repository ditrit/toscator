import { newToscaNamespace } from '#src/model/namespace.js';

export default {
    exit_namespace(parsed_rule) {
        // console.log(arguments); // TODO
        // si parsed_rule est null, on peut pas push l'erreur !
        const namespace = (parsed_rule.value) ? parsed_rule.value : '';
        parsed_rule.ctx.prog.namespace = newToscaNamespace(namespace, parsed_rule);
    }
};
