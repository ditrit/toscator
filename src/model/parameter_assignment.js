import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaParameterAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.value = input.value;
  }
}
