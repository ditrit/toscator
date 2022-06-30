import { ToscaArtifact } from "../model/ToscaArtifact.js";

export default {
   exit_artifact_defs(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setName(key);
      }
   },
   exit_artifact_def(parsed_rule) {
      this.checkArtifact(parsed_rule);
      const toscaArtifact = new ToscaArtifact(
         this.formatArtifact(parsed_rule),
         parsed_rule
      );
      parsed_rule.tosca = toscaArtifact;
   },

   formatArtifact(parsed_rule) {
      if (typeof parsed_rule.value === "string") {
         return { file: parsed_rule.value };
      }
      let properties = new Map();
      for (const key in parsed_rule.value.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca.value;
      }
      return {
         file: parsed_rule.value.file?.value,
         type: parsed_rule.value.type?.value,
         repository: parsed_rule.value.repository?.value,
         description: parsed_rule.value.description?.value,
         deploy_path: parsed_rule.value.deploy_path?.value,
         properties: properties,
         version: parsed_rule.value.version?.value,
         checksum: parsed_rule.value.checksum?.value,
         checksum_algorithm: parsed_rule.value.checksum_algorithm?.value,
      };
   },

   checkArtifact(parsed_rule) {
      // TODO: add file path validation

      if (
         !(
            typeof parsed_rule.value === "string" ||
            typeof parsed_rule.value?.file?.value === "string"
         )
      ) {
         parsed_rule.ctx?.typeError(
            parsed_rule.current,
            "Incorrect definition for Artifact"
         );
         return false;
      }
      return true;
   },
};
