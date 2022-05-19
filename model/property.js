import { Charac } from "./Charac.js";

export class ToscaProperty extends Charac {
   constructor(input, source) {
      super(input, source);
      this.required = input.required;
   }

   static _classname = "property";

   getClassname() {
      return ToscaProperty._classname;
   }

   toString() {
      return super.toString();
   }

   static isValid(input, source) {
      let res = true;
      if (!super.isValid(input, source)) {
         res = false;
      }
      if (input.required && !input.required instanceof Boolean) {
         res = false;
      }
      return res;
   }

   setName(name) {
      this.name = name;
   }
}

export function newToscaProperty(input, source) {
   let res;
   ToscaProperty.isValid(input, source)
      ? (res = new ToscaProperty(input, source))
      : (res = {});
   // console.log("resultat", res);
   return res;
}
