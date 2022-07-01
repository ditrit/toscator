import { ToscaType } from "./tosca_type.js";

export class ToscaCapabilityType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.attributes = input.attributes;
      this.properties = input.properties;
      //   this.valid_source_types = input.valid_source_types; // requires a secondary verification
   }

   getClassname() {
      return "capability_type";
   }
}
