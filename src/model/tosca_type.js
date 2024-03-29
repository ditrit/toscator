import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaType extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.derived_from = input.derived_from;
    this.version = input.version;
    this.metadata = input.metadata;
    this.description = input.description;
  }

  /**
   *
   * @param name
   * @param parsed_rule
   * @param category
   */
  setId(name, parsed_rule, category) {
    const current_st = parsed_rule.ctx.prog;
    this.name = name;
    const namespace_name = current_st.namespace.value;

    // This part is probably useless since there shoudln't be any collisions inside the same template thanks to lidy.
    if (current_st[category][`${namespace_name}/${name}`]) {
      parsed_rule.ctx.grammarError(`Type collision : ${this.import_id}`);
    } else {
      current_st[category][`${namespace_name}/${name}`] = this;
    }
  }

  /**
   *
   */
  toString() {
    let str = '';
    str += `{name: ${this.name}, \n    `;
    str += `    Derived_from: ${this.derived_from}, \n    `;
    if (this.version) { str += this.version; }
    if (this.description) { str += this.description; }
    if (this.metadata) { str += this.metadata; }
    return str;
  }

  /**
   * Make this type inherit from a given type.
   * This method allows to implement the 'derived_from' clause.
   * @param {ToscaType} parent - Parent type to inherit from.
   */
  inheritFrom(parent) {
    // Note: ??= replaces the value if it is undefined/null.
    this.version ??= parent.version;
    this.metadata ??= parent.metadata;
    if (parent.description) {
      this.description ??= `[inherited from ${parent.name}] ${parent.description}`;
    }
  }
}
