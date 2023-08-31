import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaWorkflowActivity extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.delegate = input.delegate;
    this.set_state = input.set_state;
    this.call_operation = input.call_operation;
    this.inline = input.inline;
  }
}
