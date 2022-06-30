import { ToscaNode } from "./tosca_node.js";

export default class ParameterAssignment extends ToscaNode {
   constructor(input, source) {
      super(input, source);
      this.type = input.type;
      this.value = input.value;
      this.description = input.description;
   }
}
