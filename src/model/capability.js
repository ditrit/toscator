import { ToscaNode } from "./tosca_node.js";

export class ToscaCapability extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.description = input.description;
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.valid_source_types = input.valid_source_types;
      this.occurrences = input.occurrences;
   }
   static _classname = "property";

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      // TODO: add verification on type with list of already defined types

      return true;
   }
   setName(name) {
      this.name = name;
   }
}

export function newToscaCapability(input, source) {
   let res;
   if (ToscaCapability.isValid(input, source)) {
      res = new ToscaCapability(input, source);
   } else {
      res = {};
   }
   return res;
}
