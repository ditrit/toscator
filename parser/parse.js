import { ToscaProg } from '../model/prog.js';
import {parseWithImports} from './prog_init.js';
import { ToscaImport } from '../model/imports.js';
import { Ctx } from 'lidy-js/parser/lidyctx.js';
import path from 'path';
import { ToscaServiceTemplate } from '../model/service_template.js';

export function parse(src) {
    const prog = new ToscaProg();
    const ctx = new Ctx();
    const cst = new ToscaServiceTemplate();
    cst.origin_file = path.resolve(src)
    ctx.prog = prog
    prog.current_service_template = cst;
    let init_import = new ToscaImport({
        file: path.basename(src),
        namespace_prefix: "",
        namespace_uri: "",
        last_path: path.dirname(path.resolve(src)),
        last_repo: "",
    }, {
        ctx: ctx
    });
    return parseWithImports(init_import, null, prog, [init_import.path]);
}