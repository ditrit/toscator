import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaOperationDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.inputs = input.inputs;
    this.implementation = input.implementation; // is either a name or the entire definition
    this.outputs = input.outputs;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    // TODO: Check if the implementation is valid
    return true;
  }
}
