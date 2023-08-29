import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRelationshipTemplate extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.description = input.description;
    this.metadata = input.metadata;
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.interfaces = input.interfaces;
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
}
