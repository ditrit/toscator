import CapabilityTypeListener from "../../src/listener/CapabilityTypeListener.js";

let parsed_rule = {
   value: {
      derived_from: {
         value: "tosca.capabilities.Node",
         type: "string",
      },
      description: {
         tosca: "Node capability type",
         type: "string",
      },
   },
};
let properties = new Map();
let attributes = new Map();
let output = {
   derived_from: "tosca.capabilities.Node",
   description: "Node capability type",
   properties: properties,
   attributes: attributes,
   metadata: undefined,
   version: undefined,
};

describe("CapabilityTypeListener", () => {
   test("Format capability type", () => {
      expect(CapabilityTypeListener.formatCapabilityType(parsed_rule)).toEqual(
         output
      );
   });
   test("Good capability type", () => {
      expect(CapabilityTypeListener.checkCapabilityType(parsed_rule)).toBe(
         true
      );
   });
   test("Bad capability type", () => {
      parsed_rule.value.derived_from.value = undefined;
      expect(CapabilityTypeListener.checkCapabilityType(parsed_rule)).toBe(
         false
      );
   });
});
