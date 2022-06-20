import { Group } from "../model/Group.js";

export default {
   exit_group_defs(parsed_rule) {
      for (const key in parsed_rule.value) {
         parsed_rule.value[key].tosca?.setName(key);
      }
   },
   exit_group_def(parsed_rule) {
      if (this.checkGroup(parsed_rule)) {
         const group = new Group(this.formatGroup(parsed_rule), parsed_rule);
         parsed_rule.tosca = group;
      }
   },
   formatGroup(parsed_rule) {
      const members =
         parsed_rule.value?.members?.value.map((member) => member.value) ?? [];

      let interfaces = new Map();
      for (const key in parsed_rule.value?.interfaces?.value) {
         interfaces[key] = parsed_rule.value.interfaces.value[key].tosca;
      }
      let properties = new Map();
      for (const key in parsed_rule.value?.properties?.value) {
         properties[key] = parsed_rule.value.properties.value[key].tosca;
      }

      return {
         type: parsed_rule.value.type?.value,
         description: parsed_rule.value.description?.value,
         properties: properties,
         members: members,
         interfaces: interfaces,
      };
   },
   checkGroup(parsed_rule) {
      if (!(typeof parsed_rule.value.type?.value === "string")) {
         parsed_rule.ctx?.typeError(
            parsed_rule.current,
            "Incorrect definition for Group"
         );
         return false;
      }
      if (parsed_rule.value?.members?.value.length == 0) {
         parsed_rule.ctx?.typeWarning(
            parsed_rule.current,
            "Definition for Group has zero members"
         );
      }
      return true;
   },
};
