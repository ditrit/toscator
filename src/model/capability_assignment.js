import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaCapabilityAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.occurences = input.occurences;
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
