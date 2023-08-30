import { ToscaNode } from './tosca_node.js';

let condition = ['or', 'and', 'nnot', 'assert'];

/**
 *
 */
export class ToscaWorkflowConditionOperator extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.operator = input.operator; // is it necessary ? since there already is the distinction by the class
    this.conditions = input.conditions;
    this.assertions = input.assertions;
  }

  /**
   *
   */
  static isValid() {
    return true;
  }
}

// When there is no operator, we create a ToscaWorkflowConditionOperatorAnd since no operator is the same as the operator and
/**
 *
 */
export class ToscaWorkflowConditionOperatorAnd extends ToscaWorkflowConditionOperator {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'and';
  }

  /**
   *
   */
  eval() {
    if (this.assertions.length > 0) { // this should imply that conditions.length === 0
      for (value in this.assertions) {
        if (assertions[value].eval(value)) {
          return false;
        }
      }
    } else { // then it's the conditions that is not empty
      for (condition in this.conditions) {
        if (!condition.eval()) {
          return false;
        }
      }
    }
    return true;
  }
}

/**
 *
 */
export class ToscaWorkflowConditionOperatorOr extends ToscaWorkflowConditionOperator {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'or';
  }

  /**
   *
   */
  eval() {
    if (this.assertions.length > 0) { // this should imply that conditions.length === 0
      for (value in this.assertions) {
        if (assertions[value].eval(value)) {
          return true;
        }
      }
    } else { // then it's the conditions that is not empty
      for (condition in this.conditions) {
        if (condition.eval()) {
          return true;
        }
      }
    }
    return false;
  }
}

/**
 *
 */
export class ToscaWorkflowConditionOperatorNot extends ToscaWorkflowConditionOperator {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'not';
  }

  /**
   *
   */
  eval() {
    if (this.assertions.length > 0) { // this should imply that conditions.length === 0
      for (value in this.assertions) {
        if (!assertions[value].eval(value)) {
          return true;
        }
      }
    } else { // then it's the conditions that is not empty (is it possible that both lengths=0 or >0 ?)
      for (condition in this.conditions) {
        if (!condition.eval()) {
          return true;
        }
      }
    }
    return false;
  }
}

/**
 *
 */
export class ToscaWorkflowConditionOperatorAssert extends ToscaWorkflowConditionOperator {
  /**
   *
   * @param input
   */
  static isValid(input) {
    return input.operator == 'assert';
  }

  /**
   *
   */
  eval() {
    if (this.assertions.length > 0) { // this should imply that conditions.length === 0
      for (value in this.assertions) {
        if (assertions[value].eval(value)) {
          return false;
        }
      }
    } else { // then it's the conditions that is not empty
      for (condition in this.conditions) {
        if (!condition.eval()) {
          return false;
        }
      }
    }
    return true;
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaWorkflowConditionOperatorAssert(input, source) {
  if (ToscaWorkflowConditionOperatorAssert.isValid(input)) {
    return new ToscaWorkflowConditionOperatorAssert(input, source);
  }

  source.ctx.grammarError(
    `Workflow_condition_operation ${input} could not be created as assert operation.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaWorkflowConditionOperatorNot(input, source) {
  if (ToscaWorkflowConditionOperatorNot.isValid(input)) {
    return new ToscaWorkflowConditionOperatorNot(input, source);
  }

  source.ctx.grammarError(
    `Workflow_condition_operation ${input} could not be created as not operation.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaWorkflowConditionOperatorAnd(input, source) {
  if (ToscaWorkflowConditionOperatorAnd.isValid(input)) {
    return new ToscaWorkflowConditionOperatorAnd(input, source);
  }

  source.ctx.grammarError(
    `Workflow_condition_operation ${input} could not be created as and operation.`,
  );
  return {};
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaWorkflowConditionOperatorOr(input, source) {
  if (ToscaWorkflowConditionOperatorOr.isValid(input)) {
    return new ToscaWorkflowConditionOperatorOr(input, source);
  }

  source.ctx.grammarError(
    `Workflow_condition_operation ${input} could not be created as or operation.`,
  );
  return {};
}
