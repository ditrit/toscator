import { ToscaNode } from "./tosca_node.js";

export class ToscaValue extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.value = input.value;
   }
}
