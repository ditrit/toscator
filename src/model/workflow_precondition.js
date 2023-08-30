import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaWorkflowPrecondition extends ToscaNode {
  /**
   *
   * @param input
   * @param sourcee
   */
  constructor(input, sourcee) {
    super(source);
    this.target = input.target;
    this.target_relationship = input.target_relationship;
    this.condition = input.condition;
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
