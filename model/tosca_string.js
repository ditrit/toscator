import { ToscaValue } from "./tosca_value";

export class ToscaString extends ToscaValue {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.value = input.value;
   }
}
