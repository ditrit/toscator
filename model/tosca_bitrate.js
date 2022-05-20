import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaBitrate extends ToscaScalar {
   constructor(input, source) {
      super(
         {
            type: input.type,
            value: input.value, // unit of comparaison Mbps
         },
         source
      );
   }
   static isValid(input, source) {
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+/i;

      if (!regex.test(input.value.trim())) {
         source.ctx.grammarError(`Type bitrate could not be created.`);

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
            bps: 0.000001,
            Kbps: 0.001,
            Kibps: 0.001024,
            Mbps: 1,
            Mibps: 1.048576,
            Gbps: 1000,
            Gibps: 1073.741824,
            Tbps: 1000000,
            Tibps: 1099511.627776,
            Bps: 0.000008,
            KBps: 0.008,
            KiBps: 0.008192,
            Mbps: 8,
            MiBps: 8.388608,
            Gbps: 8000,
            GiBps: 8589.934592,
            TBps: 8000000,
            TiBps: 8796093.022208,
         }[unit] * value;
   }
}

export function newToscaBitrate(input, source) {
   if (ToscaBitrate.isValid(input, source)) {
      return new ToscaBitrate(input, source);
   }
   return {};
}
