import { ToscaInterfaceAssignment } from './interface_assignment.js';

/**
 *
 */
export class ToscaInterfaceDef extends ToscaInterfaceAssignment {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.type = input.type;
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
export function newToscaInterfaceDef(input, source) {
  let res;
  if (ToscaInterfaceDef.isValid(input, source)) {
    res = new ToscaInterfaceDef(input, source);
  } else {
    res = {};
  }
  return res;
}
