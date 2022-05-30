import { ToscaProperty } from "./property.js";
import { ToscaNode } from "./tosca_node.js";
// import { ToscaType } from "./tosca_type.js";
import { ToscaCapabilityType } from "./capability_type.js";

export class ToscaCapability extends ToscaCapabilityType {
   constructor(input, source) {
      super(input, source);
      this.type = input.type;
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.valid_source_types = input.valid_source_types;
   }
   static _classname = "property";

   getClassname() {
      return ToscaProperty._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      //   if (!super.isValid(input, source)) {
      //      source.ctx.typeError(
      //         source.current,
      //         "Incorrect definition for NodeType"
      //      );
      //      return false;
      //   }
      if (input.properties instanceof ToscaProperty) {
      }
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
