import { ToscaScalar } from "./tosca_scalar";

export class ToscaTime extends ToscaScalar {
   constructor(input) {
      this.real_value = input.value;
      super({
         type: input.type,
         value: convertValue(input.value),
      });
   }

   equals(value) {
      super.equals(value);
   }
   greater_than(value) {
      super.greater_than(value);
   }
   greater_than_or_equal(value) {
      super.greater_than_or_equal(value);
   }
   less_than(value) {
      super.less_than(value);
   }
   less_than_or_equal(value) {
      super.less_than_or_equal(value);
   }
   in_range(value) {
      super.in_range(value);
   }
   valid_values(value) {
      super.valid_values(value);
   }
}

function convertValue(time) {
   let value,
      unit = time.split(" ");

   if (unit.includes("d")) {
      return value * 24 * 3600;
   }
   if (unit.includes("h")) {
      return value * 3600;
   }

   if (unit.includes("ms")) {
      return value / 1000;
   }
   if (unit.includes("us")) {
      return value / 1000000;
   }
   if (unit.includes("ns")) {
      return value / 1000000000;
   }
   if (unit.includes("m")) {
      return value * 60;
   }
   return value;
}
