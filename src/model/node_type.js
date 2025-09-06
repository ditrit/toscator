import { ToscaType } from './tosca_type.js';

/**
 * Specification 1.3:3759 Node Types
 * @augments ToscaType
 */
export class ToscaNodeType extends ToscaType {
  static _classname = 'node_type';

  /**
   * ToscaNodeType's constructor.
   * @param {object} input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    /**
     * Node type properties.
     * @type {Map<string, ToscaPropertyDef>}
     */
    this.properties = input.properties;
    /**
     * Node type attributes.
     * @type {Map<string, ToscaAttributeDef>}
     */
    this.attributes = input.attributes;
    /**
     * Node type capabilities.
     * @type {Map<string, ToscaCapabilityDef>}
     */
    this.capabilities = input.capabilities;
    /**
     * Node type requirements.
     * @type {ToscaRequirementDef[]}
     */
    this.requirements = input.requirements;

    this.artifacts = input.artifacts; // TODO: type.
    /**
     * Node type interfaces.
     * @type {Map<string, ToscaInterface>}
     */
    this.interfaces = input.interfaces;

    // this.workflows = input.workflows // TODO: type.
  }
}
