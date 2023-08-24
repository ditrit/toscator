import { newToscaCapabilityType } from '#src/model/capability_type.js';
import listener_helpers from './listener_helpers/listener_helpers.js';

/**
 * TODO
 * @param parsed_rule
 */
export function
exit_capability_types(parsed_rule) {
  for (const key in parsed_rule.value) {
    parsed_rule.value[key].tosca?.setId(
      key,
      parsed_rule,
      'capability_types',
    );
  }
}

/**
 * TODO
 * @param parsed_rule
 */
export function exit_capability_type(parsed_rule) {
  const properties = listener_helpers.propertyMapofHelper('properties', parsed_rule);
  const attributes = listener_helpers.propertyMapofHelper('attributes', parsed_rule);
  const valid_source_types = listener_helpers.propertyListofHelper('valid_source_types', false, parsed_rule);

  newToscaCapabilityType(
    {
      derived_from: parsed_rule.value.derived_from?.value,
      version: parsed_rule.value.version?.tosca,
      description: parsed_rule.value.description?.value,
      metadata: parsed_rule.value.metadata?.tosca,
      properties,
      attributes,
      valid_source_types,
    },
    parsed_rule,
  );
}
