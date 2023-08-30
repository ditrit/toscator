import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaNotificationImplementation extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.primary = input.primary;
    this.dependencies = input.dependencies;
  }

  static _classname = 'implementation';

  /**
   *
   */
  getClassname() {
    return ToscaArtifact._classname;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    // TODO: check for valid path
    return true;
  }

  /**
   *
   * @param name
   */
  setName(name) {
    this.name = name;
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaNotificationImplementation(input, source) {
  if (ToscaNotificationImplementation.isValid(input, source)) return new ToscaNotificationImplementation(input, source);
  return {};
}
