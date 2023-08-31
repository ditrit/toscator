import { ToscaMetadata } from './metadata.js';
import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class Charac extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.description = input.description;
    this.type = input.type;
    this.default = input.default;
    this.status = input.status;
    this.entry_schema = input.entry_schema;
    this.key_schema = input.key_schema;
    this.name = input.name;
  }

  static statusValues = [
    'supported',
    'unsupported',
    'experimental',
    'deprecated',
    // "optional",
  ];

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (
      input.default
         && input.constraints
         && !this.check(input, input.default)
    ) {
      source.ctx.grammarError(
        `Default value ${input.default} does not verify constraints `,
      );

      return false;
    }

    return true;
  }

  /**
   *
   * @param input
   * @param value
   */
  static check(input, value) {
    let res = true;
    const { constraints } = input.type;
    // TODO reduce, every: constraints.every((constraint)=> constraint.tosca.check(value))
    constraints?.forEach((ele) => {
      if (!ele.eval(value)) {
        res = false;
      }
    });
    return res;
  }
}
