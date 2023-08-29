import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaCondition extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.constraint = input.constraint;
    this.period = input.period;
    this.evaluations = input.evaluations;
    this.method = input.method;
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
export function newToscaCondition(input, source) {
  let res;
  if (ToscaCondition.isValid(input, source)) {
    res = new ToscaCondition(input, source);
  } else {
    res = {};
  }
  return res;
}
