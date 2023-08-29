import { ToscaNodeFilter } from '../model/node_filter.js';
import listener_helpers from './listener_helpers/listener_helpers.js';
import { validateCreateAndRegister } from '#src/models.js';

export default {
  exit_node_filter(parsed_rule) {
    const properties = listener_helpers.propertyListofHelper('properties', true, parsed_rule);
    const capabilities = listener_helpers.propertyListofHelper('capabilities', true, parsed_rule);
    validateCreateAndRegister(ToscaNodeFilter, {
      properties,
      capabilities,
    }, parsed_rule);
  },
};
