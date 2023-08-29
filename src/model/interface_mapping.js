import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaInterfaceMapping extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.operation = input.operation;
    this.workflow = input.workflow;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    // TODO: check for valid path
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
export function newToscaInterfaceMapping(input, source) {
  if (ToscaInterfaceMapping.isValid(input, source)) return new ToscaInterfaceMapping(input, source);
  return {};
}
