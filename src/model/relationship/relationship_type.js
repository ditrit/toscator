import { ToscaType } from '../tosca_type.js';

/**
 *
 */
export class ToscaRelationshipType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.interfaces = input.interfaces;
    this.valid_target_types = input.valid_target_types;
    // this.workflows = input.workflows;
  }

  static _classname = 'relationship_type';
}
