
/**
 * Helps assign the correct value to the property if it can be resolved by:
 * parsed_rule.value.property?.value
 * 
 * doesn't work properly and unless we can do several property at once, 
 * it's useless since we won't gain a lot of time
 * issue: can't modify the value associated to the property in properties...
 * 
 * @param {Array<property>} properties
 * @param {*} parsed_rule 
 * @returns {Map<property_name, property>} properties_built
 */
export function directPropertyHelper(properties, parsed_rule) {
    let properties_built = new Map();
    for (const property in properties) {
        property = parsed_rule.value[property_name]?.value;
        properties_built[Object.keys({property})[0]] = property;
    }
    return properties_built;
}