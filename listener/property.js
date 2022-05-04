import { newToscaProperty } from "../model/property.js";
import deal_deftype from "../listener/def_type.js";

export default {
   exit_properties(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setName(key);
      }
   },

   exit_property(parsed_rule) {
      let deftype = deal_deftype(parsed_rule);

      // let version = parsed_rule.value.version
      //    ? parsed_rule.value.version.value
      //    : null;

      let default_var = parsed_rule.value.default
         ? parsed_rule.value.default.value
         : null; // TO DO En fonction du type
      let status = parsed_rule.value.status
         ? parsed_rule.value.status.value
         : null;
      let metadata = parsed_rule.value.metadata
         ? parsed_rule.value.metadata.tosca
         : null;

      newToscaProperty(
         {
            type: deftype,
            // version: version,
            // required: required,
            default: default_var,
            status: status,
            metadata: metadata,
         },
         parsed_rule
      );
   },
};
