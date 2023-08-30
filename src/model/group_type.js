import policy_type from "../listener/policy_type.js";
import { ToscaType } from "./tosca_type.js";

export class ToscaGroupType extends ToscaType {
   constructor(input, source) {
      super(input, source);
      this.properties = input.properties;
      this.attributes = input.attributes;
      this.members = input.members;
   }

   static _classname = "group_type";

   getClassname() {
      return ToscaGroupType._classname;
   }

   toString() {
      return super.toString();
   }
   static isValid(input, source) {
      if (!super.isValid(input, source)) {
         source.ctx.typeError(
            source.current,
            "Incorrect definition for GroupType"
         );
         return false;
      }
      /*
      let type;
      for (const i in this.members) {
         if (type === undefined) {
            type = getMemberType(service_template, this.members[i]); 
         } else if (type !== members[i].type) {
            return false;
         }
      }*/

      return true;
   }
}

function getMemberType(service_template, member_name) {
   for (const key in service_template) {
      if (key.match('types')) {
         if (key.match("policy_types")) { // treated differently because it's an Array
            for (i in service_template[key].value) { // .value ?
               if (service_template[key].value[i].key.value === "member_name") {
                  return service_template[key].value[i].constructor.name; // to test
               }
            }
         } else {
            service_template[key].value.forEach((value, key) => {
               if (key === "member_name") {
                  return value.constructor.name //not same value as value attribute of the ToscaNode
               }
            });
         }
      }
  }
}

export function newToscaGroupType(input, source) {
   let res;
   if (ToscaGroupType.isValid(input, source)) {
      res = new ToscaGroupType(input, source);
   } else {
      res = {};
   }
   return res;
}
