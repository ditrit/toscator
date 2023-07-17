import { ToscaType } from "./tosca_type.js";

export class ToscaInterfaceType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.inputs = input.inputs;
      this.operations = input.operations;
      this.notifications = input.notifications;
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
            "Incorrect definition for InterfaceType: incorrect type"
         );
         return false;
      }
      for (const operation_name in this.operations) {
         if (operation_name === "inputs") {
            source.ctx.typeError(
               source.current,
               "Incorrect definition for InterfaceType: cannot use inputs as an operation name"
            );
            return false;
         }
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
