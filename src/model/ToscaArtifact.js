import { ToscaNode } from "./tosca_node.js";

export class ToscaArtifact extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.file = input.file;
      this.type = input.type;
      this.repository = input.repository;
      this.description = input.description;
      this.deploy_path = input.deploy_path;
      this.properties = input.properties;
      this.version = input.version;
      this.checksum = input.checksum;
      this.checksum_algorithm = input.checksum_algorithm;
   }
   getClassname() {
      return "artifact";
   }

   setName(name) {
      this.name = name;
   }
}
