import { ToscaBitrate } from "../model/ToscaBitrate.js";

export default {
   exit_bitrate(parsed_rule) {
      if (this.Check_bitrate(parsed_rule)) {
         parsed_rule.tosca = new ToscaBitrate(
            {
               type: "bitrate",
               value: parsed_rule.value,
            },
            parsed_rule
         );
      }
   },

   checkBitrate(parsed_rule) {
      let regex =
         /^[0-9]+.[0-9]*((e|E)?(-)?[0-9]+.[0-9]*)? +(K|M|G|M|T)?(i)?(b|B)ps$/gi;
      if (!regex.test(parsed_rule.value.trim())) {
         parsed_rule.ctx?.grammarError(`Type bitrate could not be created.`);
         return false;
      }
      return true;
   },
};
