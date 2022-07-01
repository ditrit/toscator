import ArtifactListener from "src/listener/ArtifactListener.js";
let compactArtifactDef = {
   value: "../my_apps_files/operation_artifact.txt",
};
let expandedArtifactDef = {
   value: {
      checksum_algorithm: {
         value: "md5",
         type: "string",
      },
      checksum: {
         value: "123456789",
         type: "string",
      },
      deploy_path: {
         value: "../my_apps_files/operation_artifact.txt",
         type: "string",
      },
      description: {
         value: "This is an artifact",
         type: "string",
      },
      file: {
         value: "../my_apps_files/operation_artifact.txt",
         type: "string",
      },
      repository: {
         value: "../my_apps_files/operation_artifact.txt",
         type: "string",
      },
      type: {
         value: "txt",
         type: "string",
      },
      version: {
         value: "1.0.0",
         type: "string",
      },
   },
};

let compactArtifact = {
   file: "../my_apps_files/operation_artifact.txt",
};
const properties = new Map();
let expandedArtifact = {
   file: "../my_apps_files/operation_artifact.txt",
   type: "txt",
   repository: "../my_apps_files/operation_artifact.txt",
   description: "This is an artifact",
   deploy_path: "../my_apps_files/operation_artifact.txt",
   version: "1.0.0",
   checksum: "123456789",
   checksum_algorithm: "md5",
   properties: properties,
};

describe("Test ArtifactListener", () => {
   test("Compact Artifact", () => {
      expect(ArtifactListener.formatArtifact(compactArtifactDef)).toEqual(
         compactArtifact
      );
   });
   test("Expanded Artifact", () => {
      expect(ArtifactListener.formatArtifact(expandedArtifactDef)).toEqual(
         expandedArtifact
      );
   });
   test("CheckParsedRule expanded", () => {
      expect(ArtifactListener.checkArtifact(expandedArtifactDef)).toBe(true);
   });
   test("false checkParsedRule expanded", () => {
      expandedArtifactDef.value.file.value = undefined;
      expect(ArtifactListener.checkArtifact(expandedArtifactDef)).toBe(false);
   });
   test(" checkParsedRule compact", () => {
      expect(ArtifactListener.checkArtifact(compactArtifactDef)).toBe(true);
   });
   test("false checkParsedRule compact", () => {
      compactArtifactDef.value = undefined;
      expect(ArtifactListener.checkArtifact(compactArtifactDef)).toBe(false);
   });
});
