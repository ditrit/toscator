import { ToscaType } from "./tosca_type.js";

export class ToscaArtifactType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.file_ext = input.file_ext;
      this.properties = input.properties;
      this.mime_type = input.mime_type;
   }

   static _classname = "artifact_type";

   getClassname() {
      return ToscaArtifactType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!ToscaType.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for ArtifactType"
         );
         return false;
      }

      //TODO: Add valid extensions to check file_ext
      if (!input.file_ext.every((ele) => typeof ele === "string")) {
         return false;
      }
      return true;
   }
}

export function newToscaArtifactType(input, source) {
   let res;
   if (ToscaArtifactType.isValid(input, source)) {
      res = new ToscaArtifactType(input, source);
   } else {
      res = {};
   }
   return res;
}
