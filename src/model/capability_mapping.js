import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaCapabilityMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.mapping = input.mapping;
    this.properties = input.properties;
    this.attributes = input.attributes;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (input.mapping && (input.properties || input.attributes)) {
      return false;
    }
    return true;
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaCapabilityMapping(input, source) {
  let res;
  if (ToscaCapabilityMapping.isValid(input, source)) {
    res = new ToscaCapabilityMapping(input, source);
  } else {
    res = {};
  }
  return res;
}
