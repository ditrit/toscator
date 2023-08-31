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
   * @param {MapNode} source
   */
  constructor(input, source) {
    super(input, source);
    /**
     * Node type properties.
     * @type {Map<string, ToscaProperty>}
     */
    this.properties = input.properties;
    /**
     * Node type attributes.
     * @type {Map<string, ToscaAttribute>}
     */
    this.attributes = input.attributes;
    /**
     * Node type capabilities.
     * @type {Map<string, ToscaCapability>}
     */
    this.capabilities = input.capabilities;
    /**
     * Node type requirements.
     * @type {ToscaRequirement[]}
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

  /**
   *
   */
  getClassname() {
    // TODO: This method could be inherited from ToscaType
    return ToscaNodeType._classname;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!ToscaType.isValid(input, source)) {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for NodeType',
      );
      return false;
    }
    // TODO: Check properties correctness.
    // if (input.properties instanceof ToscaProperty) {
    // }
    return true;
  }

  /**
   * Make this type inherit from a given type.
   * This method allows to implement the 'derived_from' clause.
   * @param {ToscaNodeType} parent - Parent type to inherit from.
   * @override
   */
  inheritFrom(parent) {
    super.inheritFrom(parent);

    // We merge map attributes with a single depth level.
    // ie. attributes inside the maps are not deeply merged.
    // NB: Tosca Specification does not explicitely states whether this merge should be
    // recursively deep. Here we made the choice of simplicity with shallow map merging.
    const mapAttributes = ['properties', 'attributes', 'capabilities', 'interfaces'];
    for (const attributeName of mapAttributes) {
      const map = new Map();

      // Values from parent.
      if (parent[attributeName]) {
        parent[attributeName].forEach((value, key) => {
          map.set(key, value);
        });
      }

      // Values from child.
      if (this[attributeName]) {
        this[attributeName].forEach((value, key) => {
          map.set(key, value);
        });
      }

      this[attributeName] = map;
    }

    // Special case: 'requirements' attribute is a list.
    // TODO: What does the specification say?
    // this.requirements = [...parent.requirements ?? [], ...this.requirements ?? []];
    // As of now, defining requirements implies that we do not inherit any
    // of them from the parent type.
    this.requirements ??= parent.requirements;

    // Special case: 'artifacts' is a map or a string.
    // Here, we just inherit if it is undefined. No deep merge.
    this.artifacts ??= parent.artifacts;
  }
}
