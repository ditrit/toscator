import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRelationshipDef extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.type = input.type;
    this.interfaces = input.interfaces;
  }
}
