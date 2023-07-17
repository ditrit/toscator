import { ToscaType } from "./tosca_type.js";

export class ToscaGroupType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.members = input.members;
   }

   static _classname = "group_type";

   getClassname() {
      return ToscaGroupType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!super.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for GroupType"
         );
         return false;
      }
      return true;
   }
}

export function newToscaGroupType(input, source) {
   let res;
   if (ToscaGroupType.isValid(input, source)) {
      res = new ToscaGroupType(input, source);
   } else {
      res = {};
   }
   return res;
}
