import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaPolicyDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.description = input.description;
    this.metadata = input.metadata;
    this.properties = input.properties;
    this.targets = input.targets;
    this.triggers = input.triggers;
  }
}
