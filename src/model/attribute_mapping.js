import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaAttributeMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.mapping = input.mapping;
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
export function newToscaAttributeMapping(input, source) {
  let res;
  if (ToscaAttributeMapping.isValid(input, source)) {
    res = new ToscaAttributeMapping(input, source);
  } else {
    res = {};
  }
  return res;
}
