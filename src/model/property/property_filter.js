import { ToscaParameter } from '../parameter/parameter.js';
import { ToscaParameterAssignment } from '../parameter/parameter_assignment.js';
import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaPropertyFilter extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.name = input.name;
    this.constraints = input.constraints;
  }

  /**
   *
   * @param {ToscaParameterAssignment} ppty = property_assignment to filter
   * @returns {boolean}
   */
  passFilter(ppty) {
    let pass = true;
    if (ppty.value) {
      this.constraints.forEach((constraint) => {
        if (!constraint.eval(ppty.value)) {
          pass = false;
        }
      });
    }
    return pass;
  }
}
