import { ToscaCapabilityType } from "./ToscaCapabilityType.js";

export class ToscaCapability extends ToscaCapabilityType {
   constructor(input, source) {
      super(input, source);
      this.type = input.type;
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.valid_source_types = input.valid_source_types;
   }

   getClassname() {
      return "Capability";
   }

   setName(name) {
      this.name = name;
   }
}
