import { ToscaScalar } from "./tosca_scalar";

export class ToscaFrequency extends ToscaScalar {
   constructor(input) {
      this.value = input.value;
      super({
         type: input.type,
         normalized_value: convertValue(input.value), // unit of comparaison kHz
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

function convertValue(frequency) {
   let value,
      unit = frequency.split(" ");
   if (!unit.includes("Hz")) {
      console.log("frequency does not contain Hz"); //TO DO error frequency
      return false;
   }
   if (unit.includes("k")) {
      return value;
   }
   if (unit.includes("M")) {
      return value * 1000;
   }
   if (unit.includes("G")) {
      return value * 1000000;
   }
   return value / 1000;
}
