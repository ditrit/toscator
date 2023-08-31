import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaRepository extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.url = input.url;
    this.description = input.description;
    if (input.token) { // creation of credential object
      this.token = input.token;
      this.protocol = input.protocol;
      this.token_type = (input.token_type) ? input.token_type : 'password';
      this.user = input.user;
      this.keys = input.keys;
    }
  }

  /**
   *
   */
  toString() {
    return `{Name: ${this.name},\n      Url: ${this.url}, \n      Descrption: ${this.description}, \n      Token: ${this.token}, \n      Protocol: ${this.prototol}, \n      Token_type: ${this.token_type}, \n      User: ${this.user}}\n`;
    // return `test: ${this.url}`
  }

  /**
   *
   */
  getFullUrl() {
    let res;
    (this.prototol) ? res += `${this.protocol}://` : 'https://';
    if (this.user) { res += `${this.user}:`; }
    if (this.token) { res += `${this.token}@`; }
    res += url;
    return res;
  }
}
