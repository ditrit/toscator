import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRequirementAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.capability = input.capability;
    this.node = input.node;
    this.relationship = input.relationship;
    this.node_filter = input.node_filter;
    this.occurrences = input.occurrences;
  }
}
