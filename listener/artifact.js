import { newToscaArtifact } from "../model/artifact.js";
import { parse } from "../schemas/tosca_1_3.js";
import listener_helpers from "./listener_helpers/listener_helpers.js";

export default {
   exit_artifact_defs(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule artifact_defs:+++++++++++++++++++++++++++++++++");
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setName(key);
      }
   },
   exit_artifact_def(parsed_rule) {
      console.log("\n+++++++++++++++++++++++++++++++++parsed_rule artifact_def:+++++++++++++++++++++++++++++++++");
      if (typeof parsed_rule.value === "string") {
         newToscaArtifact({ file: parsed_rule.value }, parsed_rule);
      } else {
         const properties = listener_helpers.propertyMapofHelper("properties", parsed_rule);
         newToscaArtifact(
            {
               file: parsed_rule.value.file.value,
               type: parsed_rule.value.type.value,
               repository: parsed_rule.value.repository?.value,
               description: parsed_rule.value.description?.value,
               deploy_path: parsed_rule.value.deploy_path?.value,
               properties: properties,
               version: parsed_rule.value.version?.tosca,
               checksum: parsed_rule.value.checksum?.value,
               checksum_algorithm: parsed_rule.value.checksum_algorithm?.value,
            },
            parsed_rule
         );
      }
   },
};
