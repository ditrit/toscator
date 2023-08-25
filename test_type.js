import { compile } from '#src/compilation.js';

const result = compile('tests/data_manual/test_parsing/testDataType.yml');
console.log('service template', result);
console.log('simple_contact_info', result.data_types.get('simple_contact_info'));
console.log('full_contact_info', result.data_types.get('full_contact_info'));

/**
 * Return a merged map.
 * Second map has priority.
 * @param {Map<T_Key, T_Value>} a - First map.
 * @param {Map<T_Key, T_Value>} b - Second map.
 * @returns {Map<T_Key, T_Value>} - Merged map.
 * @template T_Key
 * @template T_Value
 */
function mergeMap(a, b) {
  const merged = new Map();

  a.forEach((value, key) => {
    merged.set(key, value);
  });

  b.forEach((value, key) => {
    merged.set(key, value);
  });

  return merged;
}

/**
 * Get full object extended with all ancestor properties.
 * @param {ToscaDataType} dataType
 * @param {Map<string, ToscaDataType>} data_types
 */
function getInheritedProperties(dataType, data_types) {
  if (!dataType.derived_from) {
    return dataType; // no parent
  }
  const parentType = getInheritedProperties(data_types.get(dataType.derived_from), data_types);
  if (!parentType) {
    throw Error('unknown parent type');
  }

  dataType.properties = mergeMap(parentType.properties, dataType.properties);

  return dataType;
}

const extended = getInheritedProperties(result.data_types.get('full_contact_info'), result.data_types);
console.log('extended', extended);
