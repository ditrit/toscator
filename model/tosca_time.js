import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaTime extends ToscaScalar {
   constructor(input, source) {
      super(
         {
            type: input.type,
            value: input.value,
         },
         source
      );
   }
   static isValid(input) {
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+/i;

      if (!regex.test(input.value)) {
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
            d: 86400,
            h: 3600,
            m: 60,
            s: 1,
            ms: 0.001,
            ns: 0.000001,
            us: 0.000000001,
         }[unit] * value;
   }
}

export function newToscaTime(input, source) {
   if (ToscaTime.isValid(input)) {
      return new ToscaTime(input, source);
   }
   return {};
}
