import groupListener from "src/listener/GroupListener.js";

let parsed_rule = {
   value: {
      type: {
         value: "tosca.groups.Root",
      },
      description: {
         value: "My application’s logical component grouping for placement",
      },
      members: {
         value: [
            {
               value: "my_web_server",
            },
            {
               value: "my_db_server",
            },
         ],
      },
   },
};

let interfaces = new Map();
let properties = new Map();
let output = {
   type: "tosca.groups.Root",
   description: "My application’s logical component grouping for placement",
   members: ["my_web_server", "my_db_server"],
   interfaces: interfaces,
   properties: properties,
};

describe("Test GroupListener", () => {
   test("should format group correctly", () => {
      expect(groupListener.formatGroup(parsed_rule)).toEqual(output);
   });
   test("should check group correctly", () => {
      expect(groupListener.checkGroup(parsed_rule)).toEqual(true);
      parsed_rule.value.members.value = [];
      expect(groupListener.checkGroup(parsed_rule)).toEqual(true);
   });
   test("should check group incorrectly", () => {
      parsed_rule.value.type.value = undefined;
      expect(groupListener.checkGroup(parsed_rule)).toEqual(false);
   });
   test("should check group incorrectly", () => {
      expect(
         groupListener.checkGroup({
            value: {
               type: {
                  value: "tosca.groups.Root",
               },
            },
         })
      ).toEqual(true);
   });
});
