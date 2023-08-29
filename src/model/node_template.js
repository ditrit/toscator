import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaNodeTemplate extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.name = input.name;
    this.type = input.type;
    this.description = input.description;
    this.metadata = input.metadata;
    this.directives = input.directives;
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.requirements = input.requirements;
    this.capabilities = input.capabilities;
    this.interfaces = input.interfaces;
    this.articats = input.articats;
    this.node_filter = input.node_filter;
    this.copy = input.copy;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    return true;
  }

  /**
   *
   * @param node_templates
   */
  static correctGrammar(node_templates) {
    if (this.copy) {
      if (node_templates[this.copy] && node_templates[this.copy].copy) {
        return false;
      }
    }
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaNodeTemplate(input, source) {
  let res;
  if (ToscaNodeTemplate.isValid(input, source)) {
    res = new ToscaNodeTemplate(input, source);
  } else {
    res = {};
  }
  return res;
}
