/**
 *
 * @param parsed_rule
 */
function defListofHelperName(parsed_rule) {
  const listof = [];
  for (const key in parsed_rule.value) {
    const element_name = Object.keys(parsed_rule?.value[key].value)[0];
    parsed_rule.value[key].tosca?.setName(element_name);
    listof.push({
      [element_name]: parsed_rule.value[key].tosca,
    });
  }
  listof.source = parsed_rule;
  return listof;
}

/**
 *
 * @param parsed_rule
 */
function defListofHelperNoname(parsed_rule) {
  return parsed_rule.value.map((e) => ((e.tosca) ? e.tosca : e.value));
}

/**
 *
 * @param name
 * @param parsed_rule
 */
export function defListofHelper(name, parsed_rule) {
  if (name) {
    return defListofHelperName(parsed_rule);
  }
  return defListofHelperNoname(parsed_rule);
}
