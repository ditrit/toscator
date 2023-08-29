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
export function newToscaOperationDef(input, source) {
  let res;
  if (ToscaOperationDef.isValid(input, source)) {
    res = new ToscaOperationDef(input, source);
  } else {
    res = {};
  }
  return res;
}
