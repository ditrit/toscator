import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaWorkflowActivityInline extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.workflow = input.workflow;
    this.inputs = input.inputs;
  }
}
