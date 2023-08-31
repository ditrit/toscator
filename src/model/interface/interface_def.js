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
}
