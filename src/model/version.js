import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaVersion extends ToscaNode {
  /**
   *
   * @param value
   * @param source
   */
  constructor(value, source) {
    super(source);
    this.value = value;
  }

  /**
   *
   */
  toString() {
    return `Version : ${this.value}`;
  }
}
