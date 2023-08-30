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
   */
  getClassname() {
    return ToscaPolicyType._classname;
  }

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
export function newToscaPolicyType(input, source) {
  let res;
  if (ToscaPolicyType.isValid(input, source)) {
    res = new ToscaPolicyType(input, source);
  } else {
    res = {};
  }
  return res;
}
