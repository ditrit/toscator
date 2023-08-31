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
    return input.operator === 'equal' && value.includes(input.type);
  }

  /**
   *
   * @param value
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value === value;
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
    return input.operator === 'greater_than' && value.includes(input.type);
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
    return input.operator === 'greater_or_equal' && value.includes(input.type);
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
    return input.operator === 'less_than' && value.includes(input.type);
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
    return input.operator === 'less_or_equal' && value.includes(input.type);
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
      input.operator === 'in_range'
         && input.type === 'list'
         && input.value.length === 2
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
    return input.operator === 'valid_values' && input.type === 'list';
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
    return input.operator === 'length' && input.type === 'int';
  }

  /**
   *
   * @param value
   */
  eval(value) {
    return value.toString().length === this.value;
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
    return input.operator === 'max_length' && input.type === 'int';
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
    return input.operator === 'min_length' && input.type === 'int';
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
    return input.operator === 'pattern' && input.type === 'regex';
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
    return input.operator === 'schema' && input.type === 'string';
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
