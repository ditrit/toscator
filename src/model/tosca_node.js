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
}
