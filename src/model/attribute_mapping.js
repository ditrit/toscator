import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaAttributeMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.mapping = input.mapping;
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
