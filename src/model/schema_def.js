import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaSchemaDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.description = input.description;
    this.constraints = input.constraints;
    this.entry_schema = input.entry_schema;
    this.key_schema = input.key_schema;
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
