import { ToscaType } from "./tosca_type.js";

export class ToscaArtifactType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.file_ext = input.file_ext;
      this.properties = input.properties;
      this.mime_type = input.mime_type;
   }

   get classname() {
      return "artifact_type";
   }
}
