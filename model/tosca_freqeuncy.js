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
   static isValid(input, source) {
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]Hz/i;
      if (!regex.test(input.value.trim())) {
         source.ctx.grammarError(`Type frequency could not be created.`);
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
   if (ToscaFrequency.isValid(input, source)) {
      return new ToscaFrequency(input, source);
   }
   return {};
}
