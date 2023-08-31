import { Charac } from './Charac.js';

// it should extend ToscaProperty. However, according to the lidy grammar, there is a difference: metadata is not a property of input_parameter
/**
 *
 */
export class ToscaParameter extends Charac {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.constraints = input.constraints;
    this.value = input.value;
    this.metadata = input.metadata;
  }
}
