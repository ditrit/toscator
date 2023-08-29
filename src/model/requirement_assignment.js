import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRequirementAssignment extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.capability = input.capability;
    this.node = input.node;
    this.relationship = input.relationship;
    this.node_filter = input.node_filter;
    this.occurrences = input.occurrences;
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
    console.log(name);
    this.name = name;
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaRequirementAssignment(input, source) {
  let res;
  if (ToscaRequirementAssignment.isValid(input, source)) {
    res = new ToscaRequirementAssignment(input, source);
  } else {
    res = {};
  }
  return res;
}
