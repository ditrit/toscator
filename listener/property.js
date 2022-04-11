import { newToscaProperty } from "../model/property.js";
import { newDefType } from "../model/def_type.js";
import deal_deftype from "../listener/def_type.js";

export default {
   exit_properties(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca.setName(key);
      }
   },

   exit_property(parsed_rule) {
      let type,
         version,
         description,
         constraints,
         required,
         default_var,
         status,
         metadata,
         entry_schema;
      parsed_rule.value.type
         ? (type = parsed_rule.value.type.tosca)
         : (type = "");
      parsed_rule.value.version
         ? (version = parsed_rule.value.version.tosca)
         : (version = "");
      parsed_rule.value.description
         ? (description = parsed_rule.value.description.tosca)
         : (description = "");
      parsed_rule.value.constraints
         ? (constraints = parsed_rule.value.constraints.tosca)
         : (constraints = "");
      parsed_rule.value.required
         ? (required = parsed_rule.value.required.value)
         : (required = "");
      parsed_rule.value.default_var
         ? (default_var = parsed_rule.value.default_var.tosca)
         : (default_var = "");
      parsed_rule.value.status
         ? (status = parsed_rule.value.status.value)
         : (status = "");
      parsed_rule.value.metadata
         ? (metadata = parsed_rule.value.metadata.tosca)
         : (metadata = "");
      parsed_rule.value.entry_schema
         ? (entry_schema = parsed_rule.value.entry_schema.tosca)
         : (entry_schema = "");

      let deftype = deal_deftype(
         {
            type,
            constraints,
            entry_schema,
            description,
         },
         parsed_rule
      );
      console.log(deftype);

      newToscaProperty(
         {
            type: deftype,
            version: version,
            required: required,
            default: default_var,
            status: status,
            metadata: metadata,
         },
         parsed_rule
      );
   },
};
