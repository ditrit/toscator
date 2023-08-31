import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaOperationAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.inputs = input.inputs;
    this.implementation = input.implementation;
  }
}
