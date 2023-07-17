import { ToscaProg } from '../model/prog.js';
import parse_file from './prog_init.js';
import set_shortnames from './shortnames.js';
import { ToscaImport } from '../model/imports.js';
import { Ctx } from 'lidy-js/parser/lidyctx.js';
import path from 'path';

export function parse(src) {
    let prog = new ToscaProg()
    let ctx = new Ctx()
    ctx.prog = prog
    let init_import = new ToscaImport({
        file: path.basename(src),
        namespace_prefix: "",
        namespace_uri: "",
        last_path: path.dirname(path.resolve(src)),
        last_repo: "",
    }, {
        ctx: ctx
    })

    parse_file(init_import, null, prog)
    set_shortnames(prog)
    return prog
}