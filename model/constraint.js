// TODO
// It is a skeleton to be fill

import { ToscaNode } from "./tosca_node.js";
import { ToscaType } from "./tosca_type.js";

export class ToscaConstraints extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.value = input.value;
   }
   getClassname() {
      return ToscaDataType._classname;
   }

   toString() {
      return super.toString();
   }

   static isValid(input) {
      return (
         input.value instanceof Array &&
         input.value.reduce((ele) => ele instanceof ToscaConstraint)
      );
   }
}

export class ToscaConstraint extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.operator = input.operator;
      this.type = input.type;
      this.value = input.value;
   }

   static _classname = "data_type";

   getClassname() {
      return ToscaDataType._classname;
   }

   toString() {
      return super.toString();
   }

   static isValid(input) {
      let scalar = [
         "int",
         "float",
         "frequency",
         "bitrate",
         "time",
         "size",
         "timestamp",
      ];

      switch (input.operator) {
         case "equal":
            return scalar.includes(input.type);
         case "greater_than":
            return scalar.includes(input.type);
         case "greater_or_equal":
            return scalar.includes(input.type);
         case "less_than":
            return scalar.includes(input.type);
         case "less_or_equal":
            return scalar.includes(input.type);
         case "in_range":
            return input.type == "list" && input.value.length == 2;
         case "valid_values":
            return input.type == "list";
         case "length":
            return scalar.includes(input.type);
         case "min_length":
            return scalar.includes(input.type);
         case "max_length":
            return scalar.includes(input.type);
         case "pattern":
            return input.type == "regex";
         case "schema":
            return input.type == "string";
      }
      console.log("TO DO error constraint error");
      return false; // TODO
   }
}

export function newToscaConstraint(input, source) {
   if (ToscaConstraint.isValid(input)) {
      return new ToscaConstraint(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

function checkValue(constraint, value) {
   switch (constraint.operator) {
      case "equal":
         return constraint.value == value;
      case "greater_than":
         return constraint.value < value;
      case "greater_or_equal":
         return constraint.value <= value;
      case "less_than":
         return constraint.value > value;
      case "less_or_equal":
         return constraint.value >= value;
      case "in_range":
         return value >= constraint.value[0] && value <= constraint.value[1];
      case "valid_values":
         return constraint.value.includes(value);
      case "length":
         return value.length == constraint.value;
      case "min_length":
         return value.length >= constraint.value;
      case "max_length":
         return value.length <= constraint.value;
      case "pattern":
         return input.type == "regex"; // TO DO
      case "schema":
         return input.type == "string"; // TO DO
   }
   console.log("TO DO error constraint checking value");
   return false; // TODO
}
