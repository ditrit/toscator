import Ajv from 'ajv';

const ajv = new Ajv();
import { ToscaNode } from './tosca_node.js';
import { ToscaScalar } from './tosca_scalar.js';

const comparableTypes = ['integer', 'float', 'timestamp', 'version', 'scalar-unit.size', 'scalar-unit.time', 'scalar-unit.frequency', 'scalar-unit.bitrate'];
const allTypes = [...comparableTypes, 'string', 'boolean', 'range', 'list', 'map'];

/**
 * Class representing a TOSCA constraint.
 */
export class ToscaConstraint extends ToscaNode {
  /**
   * Creates a new TOSCA constraint.
   * @param {object} input - The input object.
   * @param {object} source - The source AST node.
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
 * Class representing a TOSCA constraint that checks if a value is equal to a specified value.
 */
export class ToscaConstraintEquals extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'equal' && this.isApplicable(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return allTypes.includes(type);
  }

  /**
   * Evaluates whether the given value equals the constraint's expected value.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value equals the constraint's expected value, false otherwise.
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return this.value === value;
    }
    return this.value.equals(value);
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value is greater than a specified value.
 */
export class ToscaConstraintGreaterThan extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'greater_than' && comparableTypes.includes(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return comparableTypes.includes(type);
  }

  /**
   * Evaluates whether the given value is greater than the constraint's expected value.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is greater than the constraint's expected value,
   * false otherwise.
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value < value;
    }
    if (value instanceof ToscaScalar) {
      return this.value.greater_than(value);
    }
    return false;
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value is greater than or equal
 * to a specified value.
 */
export class ToscaConstraintGreaterOrEqual extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'greater_or_equal' && comparableTypes.includes(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return comparableTypes.includes(type);
  }

  /**
   * Evaluates whether the given value is greater than or equal to the constraint's expected value.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is greater than or equal to the constraint's expected
   * value, false otherwise.
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
 * Class representing a TOSCA constraint that checks if a value is less than a specified value.
 */
export class ToscaConstraintLessThan extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'less_than' && comparableTypes.includes(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return comparableTypes.includes(type);
  }

  /**
   * Evaluates whether the given value is less than the constraint's expected value.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is less than the constraint's expected value,
   * false otherwise.
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value > value;
    }
    return this.value.less_than(value);
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value is less than or equal
 * to a specified value.
 */
export class ToscaConstraintLessOrEqual extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'less_or_equal' && comparableTypes.includes(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return comparableTypes.includes(type);
  }

  /**
   * Evaluates whether the given value is less than or equal to the constraint's expected value.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is less than or equal to the constraint's expected value,
   * false otherwise.
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value >= value;
    }
    return this.value.less_than_or_equal(value);
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value is within a specified range.
 */
export class ToscaConstraintInRange extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return (
      input.operator === 'in_range'
        && input.value.length === 2
        && this.isApplicable(input.type)
    );
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return [...comparableTypes, 'range'].includes(type);
  }

  /**
   * Evaluates whether the given value is within the constraint's specified range.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is within the constraint's range, false otherwise.
   */
  eval(value) {
    return this.value[0] <= value && this.value[1] >= value;
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value is within a list of valid values.
 */
export class ToscaConstraintValidValues extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'valid_values' && this.isApplicable(input.type);
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return allTypes.includes(type);
  }

  /**
   * Evaluates whether the given value is within the constraint's list of valid values.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value is in the list of valid values, false otherwise.
   */
  eval(value) {
    if (typeof value === 'string' || typeof value === 'number') {
      return this.value.includes(value);
    }
    return value.valid_values(this.value);
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value has an exact length.
 */
export class ToscaConstraintLength extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'length' && input.type === 'int';
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return ['string', 'list', 'map'].includes(type);
  }

  /**
   * Evaluates whether the given value has the exact length specified by the constraint.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value has the exact required length, false otherwise.
   */
  eval(value) {
    return value.toString().length === this.value;
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value has a minimum length.
 */
export class ToscaConstraintMinLength extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'min_length' && input.type === 'int';
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return ['string', 'list', 'map'].includes(type);
  }

  /**
   * Evaluates whether the given value's length meets the minimum required length.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value's length meets the minimum requirement, false otherwise.
   */
  eval(value) {
    return value.toString().length >= this.value;
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value has a maximum length.
 */
export class ToscaConstraintMaxLength extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'max_length' && input.type === 'int';
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return ['string', 'list', 'map'].includes(type);
  }

  /**
   * Evaluates whether the given value's length is within the maximum allowed length.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value's length is within the maximum limit, false otherwise.
   */
  eval(value) {
    return value.toString().length <= this.value;
  }
}

/**
 * Class representing a TOSCA constraint that checks if a value matches a regular expression
 * pattern.
 */
export class ToscaConstraintPattern extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'pattern';
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return type === 'string';
  }

  /**
   * Evaluates whether the given value matches the constraint's regular expression pattern.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value matches the pattern, false otherwise.
   */
  eval(value) {
    const regex = new RegExp(this.value);
    return regex.test(value);
  }
}

/**
 * Class representing a TOSCA constraint that validates a value against a JSON schema.
 */
export class ToscaConstraintSchema extends ToscaConstraint {
  /**
   * Selects the appropriate constraint class during parsing.
   * @param {object} input - The input object.
   * @returns {boolean} True if the constraint can be parsed, false otherwise.
   */
  isValid(input) {
    return input.operator === 'schema' && input.type === 'string';
  }

  /**
   * Checks if this constraint can be applied to the specified value type.
   * @param {string} type - The type to validate.
   * @returns {boolean} True if the constraint supports this type for comparison, false otherwise.
   */
  isApplicable(type) {
    return type === 'string';
  }

  /**
   * Evaluates whether the given value conforms to the constraint's JSON schema.
   * @param {string|number|object} value - The value to evaluate.
   * @returns {boolean} True if the value conforms to the schema, false otherwise.
   */
  eval(value) {
    const validate = ajv.compile(JSON.parse(this.value));
    return validate(value);
  }
}
