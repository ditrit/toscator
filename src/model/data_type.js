import { ToscaType } from './tosca_type.js';

/**
 *
 */
export class ToscaDataType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);

    /**
     * @type {Map<string, ToscaProperty>}
     */
    this.properties = input.properties;
    this.constraints = input.constraints;
    this.key_schema = input.key_schema;
    this.entry_schema = input.entry_schema;
  }

  static _classname = 'data_type';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) { // how to get data_types...?
    if (!super.isValid(input, source)) {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for DataType',
      );
      return false;
    }
    /* constraint...?
      if (this.properties.size===0) {
         if (!this.derived_from || validDerivedFrom(this.derived_from, data_type)) {
            source.ctx.typeError(
               source.current,
               "Incorrect definition for DataType"
            );
            return false;
         }
      } else {
         if (!ValidProperties(this.properties)) {
            source.ctx.typeError(
               source.current,
               "Incorrect definition for DataType"
            );
            return false;
         }
      } */
    return true;
  }
}

/**
 *
 * @param {string} derived_from name of the data_type which this derived from
 * @param {Map<string, ToscaDataType>} data_types
 * @returns {boolean} true if valid, else false
 */
function validDerivedFrom(derived_from, data_types) {
  if (data_types.has(derived_from)
   && data_types.get(derived_from).isValid()) { // to change isvalid() since it will only check the syntax
    return true;
  }
  return false;
}

/**
 * @param {Map<string, ToscaProperty>} properties
 * @returns {boolean} true if valid, else false
 */
function ValidProperties(properties) {
  for (const property_name in properties) {
    if (!properties.get(property_name).isValid()) { // change isValid() if it's not enough
      return false;
    }
  }
  return true;
}
