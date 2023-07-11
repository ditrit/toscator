import { ToscaNode } from "./tosca_node.js";

export class ToscaNotificationDef extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.description = input.description;
      this.outputs = input.outputs;
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
      //TODO: Check if the implementation is valid
      return true;
   }
}

export function newToscaNotificationDef(input, source) {
   let res;
   if (ToscaNotificationDef.isValid(input, source)) {
      res = new ToscaNotificationDef(input, source);
   } else {
      res = {};
   }
   return res;
}