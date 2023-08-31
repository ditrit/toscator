import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaGroupDef extends ToscaNode {
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
    this.members = input.members;
    this.metadata = input.metadata;
  }
}
