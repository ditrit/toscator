import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaFrequency extends ToscaScalar {
   constructor(input, source) {
      super(
         {
            type: input.type,
            value: input.value, // unit of comparaison kHz
         },
         source
      );
   }
   static isValid(input) {
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+/i;
      if (!regex.test(input.value)) {
         console.log("frequency does not have the good format"); //TO DO error frequency
         return false;
      }
      return true;
   }
   setNormalizedValue() {
      let value = this.value
         .trim()
         .match(/([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))? /i)[0];
      let unit = this.value.trim().match(/[a-zA-Z]+/i)[0];

      this.normalized_value =
         {
            Hz: 0.001,
            kHz: 1,
            MHz: 1000,
            GHz: 1000000,
         }[unit] * Number(value);
   }
}

export function newtoscaFrequency(input, source) {
   if (ToscaFrequency.isValid(input)) {
      return new ToscaFrequency(input, source);
   }
   return {};
}
