import {parseWithImports} from './prog_init.js';
import { ToscaImport } from '../model/imports.js';
import { Ctx } from 'lidy-js/parser/lidyctx.js';
import path from 'path';
import { ToscaServiceTemplate } from '../model/service_template.js';

export function parse(src) {
    const errors = [];
    const ctx = new Ctx();
    const cst = new ToscaServiceTemplate();
    cst.origin_file = path.resolve(src)
    ctx.prog = cst;
    let init_import = new ToscaImport({
        file: path.basename(src),
        namespace_prefix: "",
        namespace_uri: "",
    }, {
        ctx: ctx
    });
    return parseWithImports(init_import, null, errors, [init_import.path]);
}