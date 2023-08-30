import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaWorkflowActivityInline extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.workflow = input.workflow;
    this.inputs = input.inputs;
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

/**
 *
 * @param input
 * @param source
 */
export function newToscaWorkflowActivityInline(input, source) {
  let res;
  if (ToscaWorkflowActivityInline.isValid(input, source)) {
    res = new ToscaWorkflowActivityInline(input, source);
  } else {
    res = {};
  }
  return res;
}
