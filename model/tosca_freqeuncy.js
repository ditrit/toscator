import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaFrequency extends ToscaScalar {
   constructor(input) {
      this.value = input.value;
      super({
         type: input.type,
         normalized_value: convertValue(input.value), // unit of comparaison kHz
      });
   }
   static isValid(input) {
      let unit = input.value.split(" ")[1];

      if (!unit.includes("Hz")) {
         console.log("frequency does not contain Hz"); //TO DO error frequency
         return false;
      }
      return true;
   }
}

function convertValue(frequency) {
   let value = frequency.split(" ")[0];
   let unit = frequency.split(" ")[1];

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

export function newtoscaFrequency(input, source) {
   if (ToscaFrequency.isValid(input)) {
      return new ToscaFrequency(input, source);
   }
   return {};
}
