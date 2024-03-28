import { ToscaArtifactDef } from '#src/model/artifact/artifact_def.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_artifact_defs(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca.setName(key);
    }
  },
  exit_artifact_def(parsed_rule) {
    if (typeof parsed_rule.value === 'string') {
      validateCreateAndRegister(ToscaArtifactDef, { file: parsed_rule.value }, parsed_rule);
    } else {
      const properties = propertyMapofHelper('properties', parsed_rule);
      validateCreateAndRegister(
        ToscaArtifactDef,
        {
          file: parsed_rule.value.file.value,
          type: parsed_rule.value.type.value,
          repository: parsed_rule.value.repository?.value,
          description: parsed_rule.value.description?.value,
          deploy_path: parsed_rule.value.deploy_path?.value,
          properties,
          version: parsed_rule.value.version?.tosca,
          checksum: parsed_rule.value.checksum?.value,
          checksum_algorithm: parsed_rule.value.checksum_algorithm?.value,
        },
        parsed_rule,
      );
    }
  },
};
