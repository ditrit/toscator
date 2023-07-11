/** 
 * Builds object that is a _mapOf: {string: value}
 * In that case, parsed_rule.tosca already is the Map that we want to build so
 * we don't have to build anything, however we can add the name since it didn't
 * know its name.
 * 
 * @param {AST} parsed_rule
*/
export function defMapofHelperSetname(parsed_rule) {
    for (const key in parsed_rule?.value) {
        parsed_rule.value[key].tosca?.setName(key);
    }
}

/** 
 * Builds the _mapOf inside an object when it has other properties beside the _mapOf
 * 
 * @param {Array<string>} other_property_names 
 * @param {AST} parsed_rule
 * @returns {Map} property
*/
export function defPropertyMapofHelper(other_property_names, parsed_rule) {
    let property = new Map();
    for (const key in parsed_rule.value) {
        if (!other_property_names.includes(key)) {
            property[key] = parsed_rule.value[key].tosca; //why do we pick tosca and not value ?
        }
    }
}