import { parse } from "../parser/parse.js"
import { substitution } from "./substitution.js";
import fs from "fs";
import path from "path";

/**
 * parse the file and substitute the abstract nodes
 * @param {String} src = path to the file to compile
 * @returns the parsed file
 */
export function compile(src, patterns_dir) {
    const cst = parse(src);

    /**
     * TO DO: modify this method: create a new service_template that will import src and the patterns
     * instead if having a list of parsed patterns. Therefore there won't be any namespace issues
     */
    const patterns_path = patterns_dir ? patterns_dir : "./patterns";
    const patterns = fs.readdirSync(patterns_path).filter(pattern_path => {
        if (path.extname(pattern_path) === ".yml"
        || path.extname(pattern_path) === ".yaml") { //doesn't guarantee that it's a tosca file
            return true;
        }
        return false;
    });

    const list_cst = [];
    // TO DO: can optimize by parsing then checking if it can be a substitute and then break the loop
    // can also only parse the node_templates using the keywords argument of parse() and then fully parse
    // if it is a substitute
    patterns.forEach(pattern => {
        list_cst.push(parse(path.join(patterns_path, pattern)));
    });
    substitution(cst, list_cst);
    return cst;
}