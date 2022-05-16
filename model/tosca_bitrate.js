import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaBitrate extends ToscaScalar {
   constructor(input, source) {
      super(
         {
            type: input.type,
            normalized_value: convertValue(input.value), // unit of comparaison Mbps
         },
         source
      );
      this.value = input.value;
   }
   static isValid(input) {
      let unit = input.value.split(" ")[1];
      if (!(unit.includes("bps") || unit.includes("Bps"))) {
         return false;
      }
      return true;
   }
}

function convertValue(bitrate) {
   let value = bitrate.split(" ")[0];
   let unit = bitrate.split(" ")[1];

   if (unit.includes("Bps")) {
      value = value * 8;
   }

   if (unit.includes("Ki")) {
      return (value * 1024) / 1000000;
   } else if (unit.includes("K")) {
      return value / 1000;
   } else if (unit.includes("Mi")) {
      return value * 1.048576;
   } else if (unit.includes("M")) {
      return value;
   } else if (unit.includes("Gi")) {
      return value * 1073.741824;
   } else if (unit.includes("G")) {
      return value * 1000;
   } else if (unit.includes("Ti")) {
      return value * 1099511.627776;
   } else if (unit.includes("T")) {
      return value * 1000000;
   }
   return value / 1000000;
}

export function newToscaBitrate(input, source) {
   if (ToscaBitrate.isValid(input)) {
      return new ToscaBitrate(input, source);
   }
   return {};
}
