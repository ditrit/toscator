import { ToscaNode } from './tosca_node.js';
import { ToscaVersion } from './version.js';

/**
 *
 */
export class ToscaMetadata extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) { // input must be an array of MetadataLeaf
    super(source);
    this.metadatas = new Map();
    input.forEach((i) => {
      this.metadatas.set(i.name, i);
    });
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!Array.isArray(input)) {
      source.ctx.grammarError('Metadata input is not an array');
      return false;
    }
    for (const e of input) {
      if (!(e instanceof MetadataLeaf)) {
        source.ctx.grammarError('Metadata input is not a valid MetadataLeaf');
        return false;
      }
    }

    return true;
  }
}

/**
 *
 */
export class MetadataLeaf {
  /**
   *
   * @param input
   */
  constructor(input) {
    this.name = input.name;
    this.value = input.value;
  }

  /**
   *
   */
  toString() {
    return `${this.name}: ${this.value}`;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) { // parsed_rule is given only for error management
    if (typeof (input.name) !== 'string'
            || input.name == ''
            || typeof (input.value) !== 'string'
            || input.value == '' || (input.name == 'template_version' && !input.value instanceof ToscaVersion)) {
      source.ctx.grammarError('Incorrect input for metadata');
      return false;
    }
    return true;
  }
}
