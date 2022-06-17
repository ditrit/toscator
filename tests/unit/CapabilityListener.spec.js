import CapabilityListener from "../../src/listener/CapabilityListener";

let expandedCapability = {
   value: {
      type: {
         value: "mytypes.mycapabilities.MyFeature",
      },
      description: {
         value: "description",
      },
      occurrences: {
         value: [
            {
               value: 1,
            },
            {
               value: 2,
            },
         ],
      },
   },
};

let compactCapability = {
   value: "mytypes.mycapabilities.MyFeature",
};

describe("CapabilityListener", () => {
   test("should return true if the capability is valid", () => {
      expect(CapabilityListener.checkCapability(expandedCapability)).toBe(true);
      expect(CapabilityListener.checkCapability(compactCapability)).toBe(true);
   });
   test("should return false if the capability is invalid", () => {
      expect(CapabilityListener.checkCapability({})).toBe(false);
   });
   test("should return the formatted capability", () => {
      const attributes = new Map();
      const properties = new Map();
      expect(CapabilityListener.formatCapability(expandedCapability)).toEqual({
         type: "mytypes.mycapabilities.MyFeature",
         description: "description",
         occurences: [1, 2],
         attributes: attributes,
         properties: properties,
      });
      expect(CapabilityListener.formatCapability(compactCapability)).toEqual({
         type: "mytypes.mycapabilities.MyFeature",
      });
   });
});
