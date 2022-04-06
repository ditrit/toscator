import {
    ToscaProg
} from '../model/prog.js';
import parse_file from './prog_init.js';
import set_shortnames from './shortnames.js';
import {
    ToscaImport
} from '../model/imports.js';
import {
    Ctx
} from 'lidy-js/parser/lidyctx.js';

export function parse(src) {
    let prog = new ToscaProg()
    let init_import = new ToscaImport({
        file: src
    }, {
        ctx: new Ctx()
    })
    parse_file(init_import, null, prog)
    set_shortnames(prog)
    return prog
}