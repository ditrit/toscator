import { newToscaProperty } from "../model/property.js";
import { newDefType } from "../model/def_type.js";

export default function deal_deftype(property, parsed_rule) {
   if (property.entry_schema == undefined) {
      return newDefType(
         {
            type: property.type,
            constraints: property.constraints,
            description: property.description,
         },
         parsed_rule
      );
   }
   return newDefType(
      {
         type: property.type,
         constraints: property.constraints,
         entry_schema: deal_deftype(property.entry_schema, parsed_rule),
         description: property.description,
      },
      parsed_rule
   );
}
