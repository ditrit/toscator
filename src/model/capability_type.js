import { ToscaType } from './tosca_type.js';

/**
 *
 */
export class ToscaCapabilityType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.attributes = input.attributes;
    this.properties = input.properties;
    this.valid_source_types = input.valid_source_types; // requires a secondary verification
  }

  static _classname = 'capability_type';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!super.isValid(input, source)) {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for CapabilityType',
      );
      return false;
    }
    return true;
  }
}
