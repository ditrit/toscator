import { ToscaType } from '../tosca_type.js';

/**
 *
 */
export class ToscaInterfaceType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.inputs = input.inputs;
    this.operations = input.operations;
    this.notifications = input.notifications;
  }

  static _classname = 'interface_type';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    for (const operation_name in this.operations) {
      if (operation_name === 'inputs') {
        source.ctx.typeError(
          source.current,
          'Incorrect definition for InterfaceType: cannot use inputs as an operation name',
        );
        return false;
      }
    }
    return true;
  }
}
