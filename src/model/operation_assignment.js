import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaOperationAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.inputs = input.inputs;
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

/**
 *
 * @param input
 * @param source
 */
export function newToscaOperationAssignment(input, source) {
  let res;
  if (ToscaOperationAssignment.isValid(input, source)) {
    res = new ToscaOperationAssignment(input, source);
  } else {
    res = {};
  }
  return res;
}
