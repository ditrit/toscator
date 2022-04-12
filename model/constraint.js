// TODO
// It is a skeleton to be fill

import { ToscaType } from "./tosca_type.js";

export class ToscaConstraint extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.operator = input.operator;
      this.type = input.type;
      this.value_type = input.value_type;
   }

   static _classname = "data_type";

   getClassname() {
      return ToscaDataType._classname;
   }

   toString() {
      return super.toString();
   }

   static isValid(input, source) {
      switch (input.operator) {
         case "equal":
            return input.type != "scalar";
         case "greater_than":
            return input.type != "scalar" || input.value_type != "comparable";
         case "greater_or_equal":
            return input.type != "scalar" || input.value_type != "comparable";
         case "less_than":
            return input.type != "scalar" || input.value_type != "comparable";
         case "less_or_equal":
            return input.type != "scalar" || input.value_type != "comparable";
         case "in_range":
            return (
               input.type != "dual_scalar" ||
               (input.value_type != "comparable" && input.value_type != "range")
            );
         case "valid_values":
            return input.type != "list";
         case "length":
            return (
               input.type != "scalar" ||
               (input.value_type != "string" &&
                  input.value_type != "list" &&
                  input.value_type != "map")
            );
         case "min_length":
            return (
               input.type != "scalar" ||
               (input.value_type != "string" &&
                  input.value_type != "list" &&
                  input.value_type != "map")
            );
         case "max_length":
            return (
               input.type != "scalar" ||
               (input.value_type != "string" &&
                  input.value_type != "list" &&
                  input.value_type != "map")
            );
         case "pattern":
            return input.type != "regex" || input.value_type != "string";
         case "schema":
            return input.type != "string" || input.value_type != "string";
      }
      console.log("TO DO error constraint error");
      return false; // TODO
   }
}

export function newToscaConstraint(input, source) {
   let res;
   if (ToscaConstraint.isValid(input, source)) {
      res = new ToscaConstraint(input, source);
   } else {
      res = {};
   }
   return res;
}
