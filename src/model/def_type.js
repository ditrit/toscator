/**
 *
 */
export class DefType {
  // TODO : does not inherit from ToscaType ?
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    // super(source);
    this.type = input.type;
    this.description = input.description;
    this.entrySchema = input.entrySchema;
    this.constraints = input.constraints;
  }

  /**
   *
   * @param input
   */
  static isValid(input) {
    //   let res = true;
    if (!input.type || !input.type instanceof String) {
      return false;
    }
    if (['map', 'list'].includes(input.type)) {
      if (!input.entry_schema) {
        return false;
      }
    }

    return true;
  }

  /**
   *
   */
  toString() {
    return JSON.stringify(this);
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newDefType(input, source) {
  if (DefType.isValid(input)) {
    return new DefType(input, source);
  }
  // TODO error
  source.ctx.grammarError('Type not valid.');

  return false;
}
