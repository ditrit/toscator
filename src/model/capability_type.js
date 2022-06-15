import { ToscaType } from "./tosca_type.js";

export class ToscaCapabilityType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.attributes = input.attributes;
      this.properties = input.properties;
      //   this.valid_source_types = input.valid_source_types; // requires a secondary verification
   }

   static _classname = "capability_type";

   getClassname() {
      return ToscaCapabilityType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!super.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for CapabilityType"
         );
         return false;
      }
      return true;
   }
}

export function newToscaCapabilityType(input, source) {
   let res;
   if (ToscaCapabilityType.isValid(input, source)) {
      res = new ToscaCapabilityType(input, source);
   } else {
      res = {};
   }
   return res;
}
