import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaImperativeWorkflowStep extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.target = input.target;
    this.activities = input.activities;
    this.target_relationship = input.target_relationship;
    this.filter = input.filter;
    this.operation_host = input.operation_host;
    this.on_success = input.on_success;
    this.on_failure = input.on_failure;
  }
}
