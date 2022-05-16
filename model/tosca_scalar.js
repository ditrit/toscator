import { ToscaValue } from "./tosca_value.js";

export class ToscaScalar extends ToscaValue {
   constructor(input, source) {
      super(input, source);
      this.type = input.type;
      this.value = input.value;
   }
}
