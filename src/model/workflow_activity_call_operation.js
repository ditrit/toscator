import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaWorkflowActivityCallOperation extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.operation = input.operation;
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
export function newToscaWorkflowActivityCallOperation(input, source) {
  let res;
  if (ToscaWorkflowActivityCallOperation.isValid(input, source)) {
    res = new ToscaWorkflowActivityCallOperation(input, source);
  } else {
    res = {};
  }
  return res;
}
