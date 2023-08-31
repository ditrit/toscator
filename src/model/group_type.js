import { ToscaType } from './tosca_type.js';

/**
 *
 */
export class ToscaGroupType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.properties = input.properties;
    this.attributes = input.attributes;
    this.members = input.members;
  }

  static _classname = 'group_type';
}
/**
 *
 * @param service_template
 * @param member_name
 */
function getMemberType(service_template, member_name) {
  for (const key in service_template) {
    if (key.match('types')) {
      if (key.match('policy_types')) { // treated differently because it's an Array
        for (i in service_template[key].value) { // .value ?
          if (service_template[key].value[i].key.value === 'member_name') {
            return service_template[key].value[i].constructor.name; // to test
          }
        }
      } else {
        service_template[key].value.forEach((value, key) => {
          if (key === 'member_name') {
            return value.constructor.name; // not same value as value attribute of the ToscaNode
          }
        });
      }
    }
  }
}
