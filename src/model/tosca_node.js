/**
 *
 */
export class ToscaNode {
  /**
   *
   * @param source
   */
  constructor(source) {
    this.source = source;
  }

  /**
   *
   */
  linkToAST() {
    this.source.tosca = this;
  }

  /**
   *
   * @param name
   */
  setName(name) {
    this.name = name;
  }

  /**
   * @returns {string}
   */
  getClassname() {
    // TODO: what is the purpose of this method ...?
    return this.constructor._classname;
  }

  /**
   * @param input
   * @param source
   * @returns {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  static isValid(input, source) {
    return true;
  }
}
