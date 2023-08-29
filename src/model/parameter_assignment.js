import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaParameterAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.value = input.value;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (input) {
      return true;
    }
    return false;
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
export function newToscaParameterAssignment(input, source) {
  let res;
  if (ToscaParameterAssignment.isValid(input, source)) {
    res = new ToscaParameterAssignment(input, source);
  } else {
    res = {};
  }
  return res;
}
