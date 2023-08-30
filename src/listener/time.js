import { newToscaTime } from "../model/tosca_time.js";
export default {
   exit_time(parsed_rule) {
      newToscaTime(
         {
            type: "time",
            value: parsed_rule?.value,
         },
         parsed_rule
      );
   },
};
