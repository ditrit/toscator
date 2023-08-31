import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaInterfaceMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.operation = input.operation;
    this.workflow = input.workflow;
  }
}
