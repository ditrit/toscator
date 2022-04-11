import { ToscaNode } from "./tosca_node.js";
export class DefType extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.isListOrMap = input.isListOrMap;
      this.description = input.description;
      this.entrySchema = input.entrySchema;
      this.constraints = input.constraints;
   }

   static isValid(input) {
      let res = true;
      if (!input.type || !input.type instanceof String) {
         res = false;
      }
      if (input.description && !input.description instanceof ToscaDescription) {
         res = false;
      }
      // if (input.constraints && !input.constraints instanceof ToscaDescription) { // TODO
      //     res = false
      // }
      return res;
   }

   static newSimpleDefType(input, source) {
      let res;
      input.isListOrMap = false;
      DefType.isValidSimple(input, source)
         ? (res = newDefType(input, source))
         : (res = {});

      return res;
   }

   static isValidSimple(input, source) {
      let res = true;
      if (input.entrySchema) {
         res = false;
      }
   }

   static newComplexDefType(input, source) {
      let res;
      input.isListOrMap = true;

      if (input.entrySchema) {
         input.entrySchema = newDefType(entrySchema);
      } else {
         // Error TODO
      }

      DefType.isValidComplex(input, source)
         ? (res = newDefType(input, source))
         : (res = {});

      return res;
   }
}

export function newDefType(input, source) {
   let res;
   // Allow receive DefType object inside of Tosca objects
   if (input.defType) {
      input = input.defType;
   }

   DefType.isValid(input) ? (res = newDefType(input, source)) : (res = {});

   if (input.type in [Map, Array]) {
      res = DefType.newComplexDefType(input, source);
   } else {
      res = DefType.newSimpleDefType(input, source);
   }
   return res;
}
