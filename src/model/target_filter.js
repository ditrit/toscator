import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaTargetFilter extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.node = input.node;
    this.requirement = input.requirement;
    this.capability = input.capability;
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
export function newToscaTargetFilter(input, source) {
  let res;
  if (ToscaTargetFilter.isValid(input, source)) {
    res = new ToscaTargetFilter(input, source);
  } else {
    res = {};
  }
  return res;
}
