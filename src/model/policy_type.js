import { ToscaType } from './tosca_type.js';

/**
 *
 */
export class ToscaPolicyType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.properties = input.properties;
    this.targets = input.targets;
    this.triggers = input.triggers;
  }

  static _classname = 'policy_type';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!ToscaType.isValid(input, source)) {
      source.ctx.typeError(source.current, 'Incorrect definition for PolicyType');
      return false;
    }
    return true;
  }
}
