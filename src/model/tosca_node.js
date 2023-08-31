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
    this.source.tosca = this; // TODO: What is it ? What is this field's purpose ?
  }
}
