import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaNotificationImplementation extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.primary = input.primary;
    this.dependencies = input.dependencies;
  }

  static _classname = 'implementation';
}
