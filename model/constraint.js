// TODO
// It is a skeleton to be fill

import { ToscaNode } from "./tosca_node.js";
import { ToscaType } from "./tosca_type.js";

let value = [
   "boolean",
   "int",
   "float",
   "version",
   "range",
   "frequency",
   "bitrate",
   "time",
   "size",
   "timestamp",
   "string",
];
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

export class ToscaConstraintEquals extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "equal" && value.includes(input.type);
   }
}

export class ToscaConstraintGreaterThan extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "greater_than" && value.includes(input.type);
   }
}

export class ToscaConstraintGreaterOrEqual extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "greater_or_equal" && value.includes(input.type);
   }
}

export class ToscaConstraintLessThan extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "less_than" && value.includes(input.type);
   }
}

export class ToscaConstraintLessOrEqual extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "less_or_equal" && value.includes(input.type);
   }
}
export class ToscaConstraintInRange extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return (
         input.operator == "in_range" &&
         input.type == "list" &&
         input.value.length == 2
      );
   }
}
export class ToscaConstraintValidValues extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "valid_values" && input.type == "list";
   }
}

export class ToscaConstraintLength extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "length" && input.type == "int";
   }
}
export class ToscaConstraintMaxLength extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "max_length" && input.type == "int";
   }
}
export class ToscaConstraintMinLength extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "min_length" && input.type == "int";
   }
}

export class ToscaConstraintPattern extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "pattern" && input.type == "regex";
   }
}
export class ToscaConstraintSchema extends ToscaConstraint {
   constructor(input, source) {
      super(input, source);
   }
   static isValid(input) {
      return input.operator == "schema" && input.type == "string";
   }
}

export function newToscaConstraintEqual(input, source) {
   if (ToscaConstraintEquals.isValid(input)) {
      return new ToscaConstraintEquals(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintGreaterThan(input, source) {
   if (ToscaConstraintGreaterThan.isValid(input)) {
      return new ToscaConstraintGreaterThan(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintGreaterOrEqual(input, source) {
   if (ToscaConstraintGreaterOrEqual.isValid(input)) {
      return new ToscaConstraintGreaterOrEqual(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintLessThan(input, source) {
   if (ToscaConstraintLessThan.isValid(input)) {
      return new ToscaConstraintLessThan(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintLessOrEqual(input, source) {
   if (ToscaConstraintLessOrEqual.isValid(input)) {
      return new ToscaConstraintLessOrEqual(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintInRange(input, source) {
   if (ToscaConstraintInRange.isValid(input)) {
      return new ToscaConstraintInRange(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintValidValues(input, source) {
   if (ToscaConstraintValidValues.isValid(input)) {
      return new ToscaConstraintValidValues(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintValidValues(input, source) {
   if (ToscaConstraintValidValues.isValid(input)) {
      return new ToscaConstraintValidValues(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintLength(input, source) {
   if (ToscaConstraintLength.isValid(input)) {
      return new ToscaConstraintLength(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintMinLength(input, source) {
   if (ToscaConstraintMinLength.isValid(input)) {
      return new ToscaConstraintMinLength(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintMaxLength(input, source) {
   if (ToscaConstraintMaxLength.isValid(input)) {
      return new ToscaConstraintMaxLength(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintPattern(input, source) {
   if (ToscaConstraintPattern.isValid(input)) {
      return new ToscaConstraintPattern(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}

export function newToscaConstraintSchema(input, source) {
   if (ToscaConstraintSchema.isValid(input)) {
      return new ToscaConstraintSchema(input, source);
   }
   console.log("TO DO error constraint error");

   return false;
}
