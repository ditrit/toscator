import { ToscaCapabilityType } from '#src/model/capability/capability_type.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';
import { propertyListofHelper } from '#src/listener/listener_helpers/property_listof_helper.js';

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
  const properties = propertyMapofHelper('properties', parsed_rule);
  const attributes = propertyMapofHelper('attributes', parsed_rule);
  const valid_source_types = propertyListofHelper('valid_source_types', false, parsed_rule);

  validateCreateAndRegister(
    ToscaCapabilityType,
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
