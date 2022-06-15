import { ToscaType } from "./tosca_type.js";

export class ToscaInterfaceType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.inputs = input.inputs;
      this.operations = input.operations;
   }

   static _classname = "interface_type";

   getClassname() {
      return ToscaInterfaceType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!ToscaType.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for InterfaceType"
         );
         return false;
      }
      return true;
   }
}

export function newToscaInterfaceType(input, source) {
   let res;
   if (ToscaInterfaceType.isValid(input, source)) {
      res = new ToscaInterfaceType(input, source);
   } else {
      res = {};
   }
   return res;
}
