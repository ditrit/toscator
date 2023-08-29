import Ajv from 'ajv';
import Regex from 'regex';

const ajv = new Ajv();
import { ToscaNode } from './tosca_node.js';
import { ToscaScalar } from './tosca_scalar.js';

const value = [
  'boolean',
  'int',
  'float',
  'version',
  'range',
  'frequency',
  'bitrate',
  'time',
  'size',
  'timestamp',
  'string',
];
// What is the use of this class...?
/**
 *
 */
export class ToscaConstraints extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.value = input.value;
  }

  /**
   *
   */
  getClassname() {
    return ToscaDataType._classname;
  }

  /**
   *
   * @param input
   */
  static isValid(input) {
    return (
      input.value instanceof Array
         && input.value.reduce((ele) => ele instanceof ToscaConstraint)
    );
  }
}

/**
 *
 */
export class ToscaConstraint extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.operator = input.operator;
    this.type = input.type;
    this.value = input.value;
  }

  static _classname = 'data_type';

  /**
   *
   */
  getClassname() {
    return ToscaDataType._classname;
  }
}

/**
 *
 */
export class ToscaConstraintEquals extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'equal' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value == value;
    }
    return this.value.equals(value);
  }
}

/**
 *
 */
export class ToscaConstraintGreaterThan extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'greater_than' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value < value;
    }
    if (value instanceof ToscaScalar) {
      return this.value.greter_than(value);
    }
  }
}

/**
 *
 */
export class ToscaConstraintGreaterOrEqual extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'greater_or_equal' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value <= value;
    }
    if (value instanceof ToscaScalar) {
      return this.value.greater_than_or_equal(value);
    }
    return false;
  }
}

/**
 *
 */
export class ToscaConstraintLessThan extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'less_than' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value > value;
    }
    return this.value.less_than(value);
  }
}

/**
 *
 */
export class ToscaConstraintLessOrEqual extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'less_or_equal' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value >= value;
    }
    return this.value.less_than_or_equal(value);
  }
}
/**
 *
 */
export class ToscaConstraintInRange extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return (
      input.operator == 'in_range'
         && input.type == 'list'
         && input.value.length == 2
    );
  }

  /**
   *
   * @param value
   */
  eval(value) {
    // TO DO: "string" ??? can a stri0ng be in range of smth ???
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value[1] >= value && this.value[0] <= value;
    }
    return value.in_range(this.value);
  }
}
/**
 *
 */
export class ToscaConstraintValidValues extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'valid_values' && input.type == 'list';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value.includes(value);
    }
    return value.valid_values(this.value);
  }
}

/**
 *
 */
export class ToscaConstraintLength extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'length' && input.type == 'int';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    return value.toString().length == this.value;
  }
}
/**
 *
 */
export class ToscaConstraintMaxLength extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'max_length' && input.type == 'int';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    return value.toString().length <= this.value;
  }
}
/**
 *
 */
export class ToscaConstraintMinLength extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'min_length' && input.type == 'int';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    return value.toString().length >= this.value;
  }
}

/**
 *
 */
export class ToscaConstraintPattern extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'pattern' && input.type == 'regex';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    const regex = new Regex(this.value);
    return regex.test(value);
  }
}
/**
 *
 */
export class ToscaConstraintSchema extends ToscaConstraint {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'schema' && input.type == 'string';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    const validate = ajv.compile(this.value);
    return validate(value);
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintEqual(input, source) {
  if (ToscaConstraintEquals.isValid(input)) {
    return new ToscaConstraintEquals(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as equal constraint.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintGreaterThan(input, source) {
  if (ToscaConstraintGreaterThan.isValid(input)) {
    return new ToscaConstraintGreaterThan(input, source);
  }

  source.ctx.grammarError(
    `Constraint ${input} could not be created as greater_than constraint.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintGreaterOrEqual(input, source) {
  if (ToscaConstraintGreaterOrEqual.isValid(input)) {
    return new ToscaConstraintGreaterOrEqual(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as greater_or_equal constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintLessThan(input, source) {
  if (ToscaConstraintLessThan.isValid(input)) {
    return new ToscaConstraintLessThan(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as less_than constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintLessOrEqual(input, source) {
  if (ToscaConstraintLessOrEqual.isValid(input)) {
    return new ToscaConstraintLessOrEqual(input, source);
  }

  source.ctx.grammarError(
    `Constraint ${input} could not be created as less_or_equal constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintInRange(input, source) {
  if (ToscaConstraintInRange.isValid(input)) {
    return new ToscaConstraintInRange(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as In Range constraint.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintValidValues(input, source) {
  if (ToscaConstraintValidValues.isValid(input)) {
    return new ToscaConstraintValidValues(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Valid Values constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintLength(input, source) {
  if (ToscaConstraintLength.isValid(input)) {
    return new ToscaConstraintLength(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Length constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintMinLength(input, source) {
  if (ToscaConstraintMinLength.isValid(input)) {
    return new ToscaConstraintMinLength(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Min Length constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintMaxLength(input, source) {
  if (ToscaConstraintMaxLength.isValid(input)) {
    return new ToscaConstraintMaxLength(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Max Length constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintPattern(input, source) {
  if (ToscaConstraintPattern.isValid(input)) {
    return new ToscaConstraintPattern(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Pattern constraint.`,
  );

  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaConstraintSchema(input, source) {
  if (ToscaConstraintSchema.isValid(input)) {
    return new ToscaConstraintSchema(input, source);
  }
  source.ctx.grammarError(
    `Constraint ${input} could not be created as Schema constraint.`,
  );

  return {};
}
