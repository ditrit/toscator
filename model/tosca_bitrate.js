import { ToscaScalar } from "./tosca_scalar";

export class ToscaBitrate extends ToscaScalar {
   constructor(input) {
      this.value = input.value;
      super({
         type: input.type,
         normalized_value: convertValue(input.value), // unit of comparaison Mbps
      });
   }
}

function convertValue(bitrate) {
   let value,
      unit = bitrate.split(" ");
   if (!(unit.includes("bps") || unit.includes("Bps"))) {
      console.log("Bitrate does not contain bps"); //TO DO error bitrate
      return false;
   }
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
