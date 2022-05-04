import { newDefType } from "../model/def_type.js";

export default function deal_deftype(parsed_rule) {
   let type = parsed_rule.value.type ? parsed_rule.value.type.value : null;
   let description = parsed_rule.value.description
      ? parsed_rule.value.description.value
      : null;
   let constraints = parsed_rule.value.constraints
      ? parsed_rule.value.constraints.value // TO DO traiter les constraints
      : null;
   if (!parsed_rule.value.entry_schema) {
      return newDefType(
         {
            type,
            constraints,
            description,
         },
         parsed_rule
      );
   }
   return newDefType(
      {
         type,
         constraints,
         entry_schema: deal_deftype(parsed_rule.value.entry_schema),
         description,
      },
      parsed_rule
   );
}
