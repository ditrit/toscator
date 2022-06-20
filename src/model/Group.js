import { ToscaNode } from "./tosca_node.js";

export class Group extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.description = input.description;
      this.properties = input.properties;
      this.members = input.members;
      this.interfaces = input.interfaces;
   }
   getClassname() {
      return "group";
   }
   setName(name) {
      this.name = name;
   }
}
