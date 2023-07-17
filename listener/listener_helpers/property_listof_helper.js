

/**
 * @param {Array<string>} property_names
 * @param {boolean} name 
 * @param {*} parsed_rule 
 * @returns {Map<Array} properties
 */
export function propertyListofsHelper(property_names, parsed_rule) {
    let properties = new Map();
    for (const property_name in property_names) {
        propertyListofHelper(property_name, parsed_rule);
    }
    return properties;
}

/**
 * @param {string} property_name 
 * @param {boolean} name 
 * @param {*} parsed_rule 
 * @returns {Array} listof
 */
export function propertyListofHelper(property_name, name, parsed_rule) {
    if (name) {
        return propertyListofHelperName(property_name, parsed_rule);
    }
    return propertyListofHelperNoname(property_name, parsed_rule);
}



function propertyListofHelperName(property_name, parsed_rule) {
    const listof = [];
    for (const key in parsed_rule?.value[property_name]?.value) {
        //console.log(parsed_rule.value.capabilities)
        //console.log(key)
        //const element_name = parsed_rule.value[property_name]?.value[key].tosca.name;
        const element_name = Object.keys(parsed_rule.value[property_name]?.value[key].value)[0];
        listof.push({
            [element_name]: parsed_rule.value[property_name]?.value[key].tosca,
        });
    }
    if  (listof.length !== 0) {
        return listof
    }
}

/**
 * To test on properties where the property is like components: _listOf: component
 * and on properties where the property is like components: _listOf: string
 * In the first case, I believe that we should use .tosca while in the second case, we push directly the object
*/ 
function propertyListofHelperNoname(property_name, parsed_rule) {
    if ( parsed_rule?.value[property_name] ) {
        return parsed_rule.value[property_name].value.map((v) => (v.tosca) ? v.tosca : v.value);
    }
}