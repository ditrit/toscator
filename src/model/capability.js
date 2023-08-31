import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaCapability extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.description = input.description;
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.valid_source_types = input.valid_source_types;
    this.occurrences = input.occurrences;
  }

  static _classname = 'property';
}
