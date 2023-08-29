import { ToscaImport } from '../model/imports.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default { exit_imports, exit_import };

/**
 *
 * @param parsed_rule
 */
function exit_imports(parsed_rule) {
  parsed_rule.tosca = listener_helpers.defListofHelper(false, parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_import(parsed_rule) {
  if (typeof parsed_rule.value === 'string') {
    validateCreateAndRegister(ToscaImport, {
      file: parsed_rule.value,
    }, parsed_rule);
  } else {
    validateCreateAndRegister(ToscaImport, {
      file: parsed_rule.value.file.value,
      repository: parsed_rule.value.repository?.value,
      namespace_prefix: parsed_rule.value.namespace_prefix?.value,
      namespace_uri: parsed_rule.value.namespace_uri?.value,
    }, parsed_rule);
  }
}
