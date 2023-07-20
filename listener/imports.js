import { newToscaImport } from '../model/imports.js'

function exit_imports(parsed_rule) {
    console.log("\n+++++++++++++++++++++++++++++++++parsed_rule imports:+++++++++++++++++++++++++++++++++");
    //console.log(parsed_rule);
    parsed_rule.value.forEach(val => {
        let newImport;
        let file = (val.type == 'string') ? val.value : val.value.file.value;
        let repository = (val.value.repository) ? val.value.repository.value : ""
        let namespace_prefix = (val.value.namespace_prefix) ? val.value.namespace_prefix.value : ""
        let namespace_uri = (val.value.namespace_uri) ? val.value.namespace_uri.value : ""
        let last_path = parsed_rule.ctx.prog.last_path;
        let last_repo = parsed_rule.ctx.prog.last_repo;

        newImport = newToscaImport({
                file,
                repository,
                namespace_prefix,
                namespace_uri,
                last_path,
                last_repo
            },
            val)
        parsed_rule.ctx.prog.current_service_template.imports.push(newImport)
    })
}
export default {
    exit_imports
}