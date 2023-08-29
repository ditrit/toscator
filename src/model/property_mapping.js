import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaPropertyMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.value = input.value;
    this.mapping = input.mapping;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (input.value && input.mapping) {
      return false;
    }
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
export function newToscaPropertyMapping(input, source) {
  let res;
  if (ToscaPropertyMapping.isValid(input, source)) {
    res = new ToscaPropertyMapping(input, source);
  } else {
    res = {};
  }
  return res;
}
