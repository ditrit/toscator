import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaTime extends ToscaScalar {
   constructor(input) {
      this.real_value = input.value;
      super({
         type: input.type,
         value: convertValue(input.value),
      });
   }
   static units = ["d", "h", "s", "m", "ms", "us", "ns"];
   static isValid(input) {
      let unit = input.value.split(" ")[1];
      if (!this.units.includes(unit)) {
         return false;
      }
      return true;
   }
}

function convertValue(time) {
   let value = time.split(" ")[0];
   let unit = time.split(" ")[1];

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

export function newToscaTime(input, source) {
   if (ToscaTime.isValid(input)) {
      return new ToscaTime(input, source);
   }
   return {};
}
