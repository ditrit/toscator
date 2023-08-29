import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRequirementMapping extends ToscaNode {
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
export function newToscaRequirementMapping(input, source) {
  let res;
  if (ToscaRequirementMapping.isValid(input, source)) {
    res = new ToscaRequirementMapping(input, source);
  } else {
    res = {};
  }
  return res;
}
