import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaImperativeWorkflowDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.metadata = input.metadata;
    this.inputs = input.inputs;
    this.preconditions = input.preconditions;
    this.steps = input.steps;
    this.implementation = input.implementation;
    this.outputs = input.outputs;
  }
}
