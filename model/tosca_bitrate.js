import { ToscaScalar } from "./tosca_scalar";

export class ToscaBitrate extends ToscaScalar {
   constructor(input) {
      this.real_value = input.value;
      super({
         type: input.type,
         value: convertValue(input.value),
      });
   }

   equals(value) {
      super.equals(value);
   }
   greater_than(value) {
      super.greater_than(value);
   }
   greater_than_or_equal(value) {
      super.greater_than_or_equal(value);
   }
   less_than(value) {
      super.less_than(value);
   }
   less_than_or_equal(value) {
      super.less_than_or_equal(value);
   }
   in_range(value) {
      super.in_range(value);
   }
   valid_values(value) {
      super.valid_values(value);
   }
}

function convertValue(frequency) {
   let value,
      unit = frequency.split(" ");
   if (!(unit.includes("bps") || unit.includes("Bps"))) {
      console.log("Bitrate does not contain bps"); //TO DO error bitrate
      return false;
   }
   if (unit.includes("Bps")) {
      value = value * 8;
   }

   if (unit.includes("Ki")) {
      return value * 1024;
   } else if (unit.includes("K")) {
      return value * 1000;
   } else if (unit.includes("Mi")) {
      return value * 1048576;
   } else if (unit.includes("M")) {
      return value * 1000000;
   } else if (unit.includes("Gi")) {
      return value * 1073741824;
   } else if (unit.includes("G")) {
      return value * 1000000000;
   } else if (unit.includes("Ti")) {
      return value * 1099511627776;
   } else if (unit.includes("T")) {
      return value * 1000000000000;
   }
}
