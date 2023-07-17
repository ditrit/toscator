import { DefType } from "./def_type.js";
import { ToscaType } from "./tosca_type.js";

export class ToscaDataType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.properties = input.properties;
      this.constraints = input.constraints;
      this.key_schema = input.key_schema;
      this.entry_schema = input.entry_schema;
   }

   static _classname = "data_type";

   getClassname() {
      return ToscaDataType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!super.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for DataType"
         );
         return false;
      }
      return true;
   }
}

export function newToscaDataType(input, source) {
   let res;
   if (ToscaDataType.isValid(input, source)) {
      res = new ToscaDataType(input, source);
   } else {
      res = {};
   }
   return res;
}
