import { ToscaScalar } from "./tosca_scalar.js";

export class ToscaSize extends ToscaScalar {
   constructor(input, source) {
      this.value = input.value;
      super(
         {
            type: input.type,
            normalized_value: convertValue(input.value), // unit of comparaison MB
         },
         source
      );
   }

   static isvalid(input) {
      let unit = input.value.split(" ")[0];
      if (unit.includes("B")) {
         console.log("Size does not contain B"); //TO DO error size
         return false;
      }
      return true;
   }
}

function convertValue(size) {
   let value = size.split(" ")[0];
   let unit = size.split(" ")[1];

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

export function newToscaSize(input, source) {
   if (ToscaSize.isvalid(input)) {
      return new ToscaSize(input, source);
   }
   return {};
}
