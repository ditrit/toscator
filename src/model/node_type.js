import { ToscaType } from './tosca_type.js';

/**
 * @augments ToscaType
 */
export class ToscaNodeType extends ToscaType {
  /**
   *
   * @param {object} input
   * @param {MapNode} source
   */
  constructor(input, source) {
    super(input, source);
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.capabilities = input.capabilities;
    this.requirements = input.requirements;
    this.artifacts = input.artifacts;
    this.interfaces = input.interfaces;
    // this.workflows = input.workflows
  }

  static _classname = 'node_type';

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
   */
  inheritFrom(parent) {
    super.inheritFrom(parent);

    const attributes = ['properties', 'attributes', 'capabilities', 'requirements', 'artifacts', 'interfaces'];
    for (const attributeName of attributes) {
      this[attributeName] = {
        ...parent[attributeName],
        ...this[attributeName],
      };
    }
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaNodeType(input, source) {
  let res;
  if (ToscaNodeType.isValid(input, source)) {
    res = new ToscaNodeType(input, source);
  } else {
    res = {};
  }
  return res;
}
