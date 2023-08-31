import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaTopologyTemplate extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.inputs = input.inputs;
    this.outputs = input.outputs;
    this.node_templates = input.node_templates;
    this.relationship_templates = input.relationship_templates;
    this.groups = input.groups;
    this.policies = input.policies;
    this.substitution_mappings = input.substitution_mappings;
    // this.workflows = input.workflows;
  }
}
