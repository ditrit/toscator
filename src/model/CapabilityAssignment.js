import { ToscaNode } from "./tosca_node";

export default class CapabilityAssignment extends ToscaNode {
   constructor(input, source) {
      super(input, source);
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.occurences = input.occurences;
   }
}
