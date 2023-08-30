import { MetadataLeaf, ToscaMetadata } from '../model/metadata.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_metadata(parsed_rule) {
    const leafs = [];

    for (const key in parsed_rule.value) {
      const name = (key) || '';
      const value = (parsed_rule.value[key]) ? parsed_rule.value[key].value : '';

      const metadata_leaf = new MetadataLeaf({ name, value }, parsed_rule);
      leafs.push(metadata_leaf);
    }

    validateCreateAndRegister(ToscaMetadata, leafs, parsed_rule);
  },
};
