import path from 'path';

import { Ctx } from 'lidy-js/parser/lidyctx.js';
import { parseWithImports } from './prog_init.js';
import { ToscaImport } from '#src/model/imports.js';
import { ToscaServiceTemplate } from '#src/model/service_template.js';

// src has to be the relative path from the working directory to the file to parse
// it should also work with an absolute path
/**
 * Parse a TOSCA yaml file.
 * @param {string} src - Path of the file to parse.
 * @returns {ToscaServiceTemplate} Parsed service template.
 */
export function parse(src) {
  const errors = [];
  const ctx = new Ctx();
  let cst = new ToscaServiceTemplate();
  cst.origin_file = src;
  ctx.prog = cst;
  const init_import = new ToscaImport({
    file: path.basename(src),
    namespace_prefix: '',
    namespace_uri: '',
  }, {
    ctx,
  });
  init_import.setAbsolutePath();

  cst = parseWithImports(init_import, null, errors, [init_import.path]);

  return cst;
}
