import { ToscaNode } from "./tosca_node.js";

export class ToscaCondition extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.constraint = input.constraint;
      this.period = input.period;
      this.evaluations = input.evaluations;
      this.method = input.method;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      return true;
   }
}

export function newToscaCondition(input, source) {
   let res;
   if (ToscaCondition.isValid(input, source)) {
      res = new ToscaCondition(input, source);
   } else {
      res = {};
   }
   return res;
}
