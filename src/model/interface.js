import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaInterface extends ToscaNode {
  // TODO: unused?
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.inputs = input.inputs;
    this.operations = input.operations;
    this.notifications = input.notifications;
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
