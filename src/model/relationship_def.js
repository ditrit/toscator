import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRelationshipDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.interfaces = input.interfaces;
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
export function newToscaRelationshipDef(input, source) {
  let res;
  if (ToscaRelationshipDef.isValid(input, source)) {
    res = new ToscaRelationshipDef(input, source);
  } else {
    res = {};
  }
  return res;
}
