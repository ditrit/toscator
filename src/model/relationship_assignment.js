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
