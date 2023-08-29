import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaTriggerDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.name = input.name;
    this.description = input.description;
    this.event = input.event;
    this.schedule = input.schedule;
    this.target_filter = input.target_filter;
    this.condition = input.condition;
    this.action = input.action;
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
