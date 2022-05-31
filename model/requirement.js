import capability from "../listener/capability.js";
import { ToscaNode } from "./tosca_node.js";
// import { ToscaType } from "./tosca_type.js";

export class ToscaRequirement extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.capability = input.capability;
      this.description = input.description;
      this.node = input.node;
      this.occurences = input.occurences;
      this.relationship = input.relationship;
      this.name = input.name;
   }
   static _classname = "requirement";

   getClassname() {
      return ToscaRequirement._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      // if (capability instanceof String) {
      //    source.ctx.typeError(
      //       source.current,
      //       "Incorrect definition for requirement"
      //    );
      //    return false;
      // }
      //   if (input.properties instanceof ToscaProperty) {
      //   }
      return true;
   }
}

export function newToscaRequirement(input, source) {
   let res;
   if (ToscaRequirement.isValid(input, source)) {
      res = new ToscaRequirement(input, source);
   } else {
      res = {};
   }
   return res;
}
