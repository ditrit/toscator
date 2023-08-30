import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaGroupDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.description = input.description;
    this.properties = input.properties;
    this.members = input.members;
    this.metadata = input.metadata;
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
export function newToscaGroupDef(input, source) {
  let res;
  if (ToscaGroupDef.isValid(input, source)) {
    res = new ToscaGroupDef(input, source);
  } else {
    res = {};
  }
  return res;
}
