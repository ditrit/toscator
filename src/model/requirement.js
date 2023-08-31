import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRequirement extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.capability = input.capability;
    this.node = input.node;
    this.occurences = input.occurences;
    this.relationship = input.relationship;
    this.name = input.name;
  }

  static _classname = 'requirement';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!typeof input.capability === 'string') {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for requirement',
      );
      return false;
    }
    //   if (input.properties instanceof ToscaProperty) {
    //   }
    return true;
  }
}
