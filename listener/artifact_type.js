import { newToscaArtifactType } from "../model/artifact_type.js";

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

   exit_artifact_type(parsed_rule) {
      let properties = new Map();
      for (const key in parsed_rule.value.properties.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }
      let file_ext = [];
      for (const key in parsed_rule.value.file_ext?.value) {
         file_ext.push(parsed_rule.value.file_ext.value[key].value);
      }

      newToscaArtifactType(
         {
            derived_from: parsed_rule.value.derived_from?.value,
            version: parsed_rule.value.version?.tosca,
            description: parsed_rule.value.description?.value,
            metadata: parsed_rule.value.metadata?.tosca,
            properties: properties,
            mime_type: parsed_rule.value.mime_type?.value,
            file_ext: file_ext,
         },
         parsed_rule
      );
   },
};
