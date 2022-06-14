import { newToscaArtifact } from "../model/artifact.js";

export default {
   exit_artifact_defs(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setName(key);
      }
   },
   exit_artifact_def(parsed_rule) {
      if (typeof parsed_rule.value === "string") {
         newToscaArtifact({ file: parsed_rule.value }, parsed_rule);
      } else {
         let properties = new Map();
         for (const key in parsed_rule.value.properties?.value) {
            properties[key] = parsed_rule.value.properties.value[key].tosca;
            // inputs.push(parsed_rule.value.inputs.value[key].tosca);
         }
         newToscaArtifact(
            {
               file: parsed_rule.value.file.value,
               type: parsed_rule.value.type.value,
               repository: parsed_rule.value.repository?.value,
               description: parsed_rule.value.description?.value,
               deploy_path: parsed_rule.value.deploy_path?.value,
               properties: parsed_rule.value.properties?.value,
               version: parsed_rule.value.version?.value,
               checksum: parsed_rule.value.checksum?.value,
               checksum_algorithm: parsed_rule.value.checksum_algorithm?.value,
            },
            parsed_rule
         );
      }
   },
};
