import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaInterfaceAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.inputs = input.inputs;
    this.operations = input.operations;
    this.notifications = input.notifications;
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
