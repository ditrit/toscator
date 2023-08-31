import { ToscaInterfaceMapping } from '#src/model/interface/interface_mapping.js';
import { validateCreateAndRegister } from '#src/models.js';
import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default { exit_interfaces_mapping, exit_interface_mapping };

/**
 *
 * @param parsed_rule
 */
function exit_interfaces_mapping(parsed_rule) {
  defMapofHelperSetname(parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_interface_mapping(parsed_rule) {
  for (const operation in parsed_rule.value) {
    validateCreateAndRegister(ToscaInterfaceMapping, {
      operation,
      workflow: parsed_rule.value[operation]?.value,
    }, parsed_rule);
  }
}
