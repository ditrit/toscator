import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaValue extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.value = input.value;
  }
}
