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

  /**
   *
   * @param name
   */
  setName(name) {
    this.name = name;
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaInterfaceAssignment(input, source) {
  let res;
  if (ToscaInterfaceAssignment.isValid(input, source)) {
    res = new ToscaInterfaceAssignment(input, source);
  } else {
    res = {};
  }
  return res;
}
