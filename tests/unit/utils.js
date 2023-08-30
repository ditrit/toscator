/**
 *
 * @param {object} object
 * @param {string[]} fields
 */
export function ignore_fields_and_circular_ref(object, fields = ['origin_file', 'file']) {
  const seen = new Set();
  const replacer = (key, value) => {
    if (fields.includes(key)) return '__IGNORED__'; // ignore

    // ignore circular references
    if (seen.has(value)) return undefined;
    seen.add(value);

    return value;
  };

  return JSON.parse(JSON.stringify(object, replacer));
}
