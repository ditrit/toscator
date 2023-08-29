import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaTimeInterval extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.start_time = input.start_time;
    this.end_time = input.end_time;
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
