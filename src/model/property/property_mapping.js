import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaPropertyMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.value = input.value;
    this.mapping = input.mapping;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (input.value && input.mapping) {
      return false;
    }
    return true;
  }
}
