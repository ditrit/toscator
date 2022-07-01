import { ToscaNode } from "./tosca_node";

export default class InterfaceAssignment extends ToscaNode {
   constructor(input, source) {
      super(input, source);
      this.inputs = input.inputs;
   }
}
