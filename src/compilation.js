import fs from 'fs';
import path from 'path';
import { Parser } from './parser/parse.js';
import { substitution } from './substitution/substitution.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

/**
 *
 * @param {ToscaNodeType} nodeType
 * @param {Map<string,ToscaNodeType>} node_types
 */
function inheritNodeTypeFromParent(nodeType, node_types) {
  if (!nodeType.derived_from) {
    return nodeType;
  }

  // TODO: What should we do here? Right now we ignore TOSCA types.
  if (nodeType.derived_from.startsWith('tosca.nodes.')) {
    return nodeType;
  }

  const parent = node_types.get(nodeType.derived_from);

  if (!parent) {
    // TODO: Give the corresponding line of code in the error.
    throw new Error(`Parent type '${nodeType.derived_from}' not found for type '${nodeType.name}'.`);
  }

  const completedParent = inheritNodeTypeFromParent(parent, node_types);

  nodeType.inheritFrom(completedParent);

  return nodeType;
}

/**
 * Parse the file, resolve types and substitute abstract nodes
 * @param {string} src - Path to the file to compile.
 * @param {string} [patterns_dir] - Path to the directory containing patterns.
 * @returns {ToscaServiceTemplate} Compiled service template.
 */
export function compile(src, patterns_dir = undefined) {
  // 1 : Parsing
  const parser = new Parser(new NodeJsFileManager());
  const serviceTemplate = parser.parse(src);

  // 2 : Type resolution
  // TODO: Make other types inherit.
  for (const nodeType of serviceTemplate.node_types.values()) {
    inheritNodeTypeFromParent(nodeType, serviceTemplate.node_types);
  }

  // 3 : Substitution
  /**
   * TODO: modify this method: create a new service_template that will import src and the patterns
   * instead if having a list of parsed patterns. Therefore there won't be any namespace issues
   */

  const list_cst = [];
  if (patterns_dir) {
    const patterns = fs
      .readdirSync(patterns_dir)
    // Doesn't guarantee that it's a tosca file.
      .filter((pattern_path) => ['.yml', '.yaml'].includes(path.extname(pattern_path)));

    // TODO: can optimize by parsing then checking if it can be a substitute and then break the loop
    // can also only parse the node_templates using the keywords argument of parse() and then
    // fully parse if it is a substitute
    patterns.forEach((pattern) => {
      list_cst.push(parser.parse(path.join(patterns_dir, pattern)));
    });
  }

  substitution(serviceTemplate, list_cst);

  return serviceTemplate;
}
