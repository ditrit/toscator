import { ToscaNode } from "./tosca_node.js";

export class OperationDef extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.description = input.description;
      this.inputs = input.inputs;
      this.implementation = input.implementation;
   }

   getClassname() {
      return OperationDef._classname;
   }

   toString() {
      return super.toString();
   }

   setName(name) {
      this.name = name;
   }
   static isValid(input, source) {
      // if (!super.isValid(input, source)) {
      //      source.ctx.typeError(
      //         source.current,
      //         "Incorrect definition for OperationDef"
      //      );
      //      return false;
      // }
      return true;
   }
}

export function newOperationDef(input, source) {
   let res;
   if (OperationDef.isValid(input, source)) {
      res = new OperationDef(input, source);
   } else {
      res = {};
   }
   return res;
}
