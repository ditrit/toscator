import { newToscaSize } from "../model/tosca_size.js";

export default {
   exit_size(parsed_rule) {
      newToscaSize(
         {
            type: "size",
            value: parsed_rule.value,
         },
         parsed_rule
      );
   },
};
