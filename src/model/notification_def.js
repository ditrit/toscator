import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaNotificationDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.outputs = input.outputs;
    this.implementation = input.implementation;
  }

  /**
   *
   */
  getClassname() {
    return OperationDef._classname;
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
