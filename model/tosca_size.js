import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaSize extends ToscaScalar {
   constructor(input, source) {
      super(
         {
            type: input.type,
            value: input.value, // unit of comparaison MB
         },
         source
      );
   }

   static isvalid(input, source) {
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+/i;

      if (!regex.test(input.value.trim())) {
         source.ctx.grammarError(`Type size could not be created.`);
         return false;
      }
      return true;
   }
   consetNormalizedValuevertValue() {
      let value = this.value
         .trim()
         .match(/([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))? /i)[0];
      let unit = this.value.trim().match(/[a-zA-Z]+/i)[0];
      this.normalized_value =
         {
            B: 0.000001,
            kB: 0.001,
            KiB: 0.001024,
            MB: 1,
            MiB: 1.048576,
            GB: 1000,
            GiB: 1073.741824,
            TB: 1000000,
            TiB: 1099511.627776,
         }[unit] * value;
   }
}

export function newToscaSize(input, source) {
   if (ToscaSize.isvalid(input, source)) {
      return new ToscaSize(input, source);
   }
   return {};
}
