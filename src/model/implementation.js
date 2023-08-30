import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaImplementation extends ToscaNode {
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

  /**
   *
   */
  getClassname() {
    return this._classname;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    // TODO: check for valid path
    return true;
  }
}
