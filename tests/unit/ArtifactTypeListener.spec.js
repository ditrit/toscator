import ArtifactTypeListener from "src/listener/ArtifactTypeListener.js";
import metadata from "../data/metadata.json";
let parsedRule = {
   value: {
      derived_from: {
         value: "tosca.artifact.Root",
         type: "string",
      },
      description: {
         value: "Java Archive artifact type",
         type: "string",
      },
      mime_type: {
         value: "application/java-archive",
         type: "string",
      },
   },
};
const empty_properties = new Map();
let output = {
   derived_from: "tosca.artifact.Root",
   version: undefined,
   description: "Java Archive artifact type",
   metadata: undefined,
   file_ext: undefined,
   mime_type: "application/java-archive",
   properties: empty_properties,
};
describe("Test ArtifactTypeListener", () => {
   test("formatParsedRule", () => {
      expect(ArtifactTypeListener.formatParsedRule(parsedRule)).toEqual(output);
   });
   test("CheckParsedRule", () => {
      expect(ArtifactTypeListener.checkParsedRule(parsedRule)).toBe(true);
   });
   test("false checkParsedRule", () => {
      parsedRule.value.derived_from.value = undefined;
      expect(ArtifactTypeListener.checkParsedRule(parsedRule)).toBe(false);
   });
});
