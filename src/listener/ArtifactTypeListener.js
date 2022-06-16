import { ToscaArtifactType } from "../model/ToscaArtifactType.js";

export default {
   exit_artifact_types(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setId(
            key,
            parsed_rule,
            "artifact_types"
         );
      }
   },

   // This function is called when the parser encounters a rule
   exit_artifact_type(parsed_rule) {
      this.checkArtifactType(parsed_rule);
      const toscaArtifactType = new ToscaArtifactType(
         this.formatArtifactType(parsed_rule),
         parsed_rule
      );
      parsed_rule.tosca = toscaArtifactType;
   },

   // This function is called to extract the value of a parsed rule
   formatArtifactType(parsed_rule) {
      let properties = new Map();
      for (const key in parsed_rule.value.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }
      const fileExt = parsed_rule.value.file_ext?.value.map((ele) => ele.tosca);
      const formattedParsedRule = {
         derived_from: parsed_rule.value.derived_from?.value,
         version: parsed_rule.value.version?.tosca,
         description: parsed_rule.value.description?.value,
         metadata: parsed_rule.value.metadata?.tosca,
         properties: properties,
         mime_type: parsed_rule.value.mime_type?.value,
         file_ext: fileExt,
      };
      return formattedParsedRule;
   },

   // This function is called to check if the parsed rule is correct
   checkArtifactType(parsed_rule) {
      //TODO: Add valid extensions to check file_ext

      if (!parsed_rule.value.derived_from?.value) {
         parsed_rule.ctx?.grammarWarning(
            parsed_rule.current,
            "Missing derived_from field in artifact_type"
         );
         return false;
      }
      return true;
   },
};
