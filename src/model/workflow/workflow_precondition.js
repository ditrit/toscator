import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaWorkflowPrecondition extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.target = input.target;
    this.target_relationship = input.target_relationship;
    this.condition = input.condition;
  }
}
