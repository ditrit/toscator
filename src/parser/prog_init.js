import { parse as parse_tosca } from '#src/schemas/tosca_1_3.js';
import { listenerObject } from '#src/listener/listener.js';
import { ToscaServiceTemplate } from '#src/model/service_template.js';
import { localNames, exportToParent, getRidOfNameCtg } from './namespace.js';
import { getAbsolutePath, getArtifact } from './getArtifact.js';

/**
 * parse the file without doing anything about the namespaces and the importations
 * @param {Listener} listener list of listeners to parse the file
 * @param {ToscaImport} file to parse
 * @param {string} src_data = file to parse in string
 * @param {string} abs_path = absolute path to the file
 * @returns {ToscaServiceTemplate} parsed file
 */
function simpleParse(listener, file, src_data, abs_path) {
  const { namespace_uri } = file;
  const { namespace_prefix } = file;

  const current_service_template = new ToscaServiceTemplate();
  current_service_template.origin_file = abs_path;
  current_service_template.ns_uri = namespace_uri || '';
  current_service_template.ns_prefix = namespace_prefix || '';

  parse_tosca({
    src_data,
    listener,
    prog: current_service_template,
    abs_path,
  });

  return current_service_template;
}

/**
 * Parse the current_service_template
 * Import the service templates to import
 * Export the current_service_template to the parent if it exists
 * @param {ToscaImport} file_import = file to import that will become the current_service_template
 * @param {ToscaServiceTemplate} parent_service_template = service template importing the
 * current_service_template
 * @param {*} errors - Errors.
 * @param {Array<string>} import_branch = list of the files imported in the current recursive branch
 * @returns {ToscaServiceTemplate} current_service_template parsed with the imports
 */
export function parseWithImports(file_import, parent_service_template, errors, import_branch) {
  // Note: can optimize here by giving last element of import_branch which is abs_path
  // as an argument so that getartifact() doesn't have to get it itself
  const { src_data, abs_path } = getArtifact(
    file_import.source.ctx.prog.origin_file,
    file_import.file,
    file_import.getRepository(),
    errors,
  );

  const current_service_template = simpleParse(listenerObject, file_import, src_data, abs_path);

  localNames(current_service_template);

  current_service_template.imports?.forEach((file_imp) => {
    // if it hasn't already been imported in this import_branch, then parse it
    const imp_abs_path = getAbsolutePath(
      file_imp.repository,
      file_imp.file,
      file_imp.source.ctx.prog.origin_file,
    );
    if (!import_branch.includes(imp_abs_path)) {
      const new_import_branch = JSON.parse(JSON.stringify(import_branch));
      new_import_branch.push(imp_abs_path);
      parseWithImports(file_imp, current_service_template, errors, new_import_branch);
    }
  });

  if (parent_service_template) {
    exportToParent(file_import, parent_service_template, current_service_template);
  } else {
    // since we don't need the name_ctg anymore we return to the old (and correct)
    // structure of ToscaServiceTemplate
    getRidOfNameCtg(current_service_template);
  }
  return current_service_template;
}
