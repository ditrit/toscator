import { ToscaInterfaceType } from '#src/model/interface_type.js';
import { validateCreateAndRegister } from '#src/models.js';
import { propertyMapofHelper } from '#src/listener/listener_helpers/property_mapof_helper.js';

export default {
  exit_interface_types(parsed_rule) {
    for (const key in parsed_rule.value) {
      parsed_rule.value[key].tosca.setId(
        key,
        parsed_rule,
        'interface_types',
      );
    }
  },

  exit_interface_type(parsed_rule) {
    const inputs = propertyMapofHelper('inputs', parsed_rule);
    const operations = propertyMapofHelper('operations', parsed_rule);
    const notifications = propertyMapofHelper('notifications', parsed_rule);
    validateCreateAndRegister(
      ToscaInterfaceType,
      {
        derived_from: parsed_rule.value.derived_from?.value,
        version: parsed_rule.value.version?.tosca,
        description: parsed_rule.value.description?.value,
        metadata: parsed_rule.value.metadata?.tosca,
        inputs,
        operations,
        notifications,
      },
      parsed_rule,
    );
  },
};
