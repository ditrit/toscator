import { Charac } from '../Charac.js';

/**
 *
 */
export class ToscaPropertyDef extends Charac {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.required = input.required;
    this.constraints = input.constraints;
    this.metadata = input.metadata;
  }

  static _classname = 'property';
}
