import listener_helpers from './listener_helpers/listener_helpers.js';
import { ToscaRepository } from '#src/model/repository.js';
import { validateCreateAndRegister } from '#src/models.js';

/**
 *
 * @param parsed_rule
 */
function exit_repositories(parsed_rule) {
  listener_helpers.defMapofHelperSetname(parsed_rule);
}

/**
 *
 * @param parsed_rule
 */
function exit_repository(parsed_rule) {
  if (typeof parsed_rule.value === 'string') {
    validateCreateAndRegister(ToscaRepository, { url: parsed_rule.value }, parsed_rule);
  } else if (parsed_rule.value.credential) {
    const keys = new Map();
    for (const key in parsed_rule.value.credential.value.keys?.value) {
      keys.set(key, parsed_rule.value.credential.value.keys.value[key].value);
    }
    validateCreateAndRegister(ToscaRepository, {
      url: parsed_rule.value.url?.value,
      description: parsed_rule.value.description?.value,
      token: parsed_rule.value.credential.value.token?.value,
      protocol: parsed_rule.value.credential.value.protocol?.value,
      token_type: parsed_rule.value.credential.value.token_type?.value,
      user: parsed_rule.value.credential.value.user?.value,
      keys,
    }, parsed_rule);
  } else {
    validateCreateAndRegister(ToscaRepository, {
      url: parsed_rule.value.url?.value,
      description: parsed_rule.value.url?.value,
    }, parsed_rule);
  }
}

export default { exit_repositories, exit_repository };
