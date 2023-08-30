import { ToscaRelationshipDef } from './relationship_def.js';

/**
 *
 */
export class ToscaRelationshipAssignment extends ToscaRelationshipDef {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.properties = input.properties;
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
export function newToscaRelationshipAssignment(input, source) {
  let res;
  if (ToscaRelationshipAssignment.isValid(input, source)) {
    res = new ToscaRelationshipAssignment(input, source);
  } else {
    res = {};
  }
  return res;
}
