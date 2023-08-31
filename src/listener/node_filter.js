import { ToscaNodeFilter } from '../model/node_filter.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

export default {
  exit_node_filter(parsed_rule) {
    const properties = propertyListofHelper('properties', true, parsed_rule);
    const capabilities = propertyListofHelper('capabilities', true, parsed_rule);
    validateCreateAndRegister(ToscaNodeFilter, {
      properties,
      capabilities,
    }, parsed_rule);
  },
};
