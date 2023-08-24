import { parse } from './parser/parse.js';
import { substitution } from './substitution/substitution.js';
import fs from 'fs';
import path from 'path';

/**
 * Parse the file, resolve types and substitute abstract nodes
 * @param {String} src - Path to the file to compile.
 * @param {String} patterns_dir - Path to the directory containing patterns.
 * @returns {ToscaServiceTemplate}
 */
export function compile(src, patterns_dir) {

    // 1 : Parsing
    const cst = parse(src);


    // 2 : Type resolution
    // TODO




    // 3 : Substitution
    /**
     * TODO: modify this method: create a new service_template that will import src and the patterns
     * instead if having a list of parsed patterns. Therefore there won't be any namespace issues
     */

    const list_cst = [];
    if(patterns_dir){
        const patterns = fs
            .readdirSync(patterns_dir)
            // Doesn't guarantee that it's a tosca file.
            .filter(pattern_path => ['.yml','.yaml'].includes(path.extname(pattern_path)));


        // TODO: can optimize by parsing then checking if it can be a substitute and then break the loop
        // can also only parse the node_templates using the keywords argument of parse() and then fully parse
        // if it is a substitute
        patterns.forEach(pattern => {
            list_cst.push(parse(path.join(patterns_dir, pattern)));
        });
    }

    substitution(cst, list_cst);

    return cst;
}
