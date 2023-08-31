import { validateCreateAndRegister } from '#src/models.js';
import { ToscaArtifactType } from '#src/model/artifact/artifact_type.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_artifact_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca?.setId(
        key,
        parsed_rule,
        'artifact_types',
      );
    }
  },

  exit_artifact_type(parsed_rule) {
    const properties = propertyMapofHelper('properties', parsed_rule);
    const file_ext = [];
    for (const key in parsed_rule.value.file_ext?.value) {
      file_ext.push(parsed_rule.value.file_ext.value[key].value);
    }

    validateCreateAndRegister(
      ToscaArtifactType,
      {
        derived_from: parsed_rule.value.derived_from?.value,
        version: parsed_rule.value.version?.tosca,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        properties,
        mime_type: parsed_rule.value.mime_type?.value,
        file_ext,
      },
      parsed_rule,
    );
  },
};
