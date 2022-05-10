import { ToscaScalar } from "./tosca_scalar";

export class ToscaTime extends ToscaScalar {
   constructor(input) {
      this.real_value = input.value;
      super({
         type: input.type,
         value: convertValue(input.value),
      });
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
