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
}
