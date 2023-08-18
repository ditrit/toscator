

/**
 * Builds the properties of the object that are _mapOf
 * @param {Array<string>} property_names: list of the names of the properties of the object that are _mapOf
 * @param {AST} parsed_rule: AST where the values needed to build the properties are located
 * @return {Map: {String: Map}} properties: Map of the properties of the object    
*/ 
export function propertyMapofsHelper(property_names, parsed_rule) {

    let properties = new Map();
    for (let property_name in property_names) {
        properties[property_name] = propertyMapofHelper(property_name);
    }
    return properties;
}
/** 
 * Builds the property of the object that is a _mapOf according to its definition
 * @param {string}  property_name: the name of the property that we want to build
 * @param {AST} parsed_rule
 * @return {Map} property: the property built
*/
export function propertyMapofHelper(property_name, parsed_rule) {
    
    const property = new Map();
    for (const key in parsed_rule?.value[property_name]?.value) {
        property.set(key, parsed_rule.value[property_name].value[key].tosca);
    }
    if (property.size > 0) {
        return property
    }
}


