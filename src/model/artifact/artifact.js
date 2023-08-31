import { ToscaNode } from '../tosca_node.js';

/**
 *
 */
export class ToscaArtifact extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
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

  static _classname = 'artifact';

  /**
   *
   * @param service_template
   */
  static correctGrammar(service_template) {
    // TODO: What is the purpose? Is this unfinished?
    const artifact_type = service_template.artifact_types[this.type];
    // mime_type...?
    if (artifact_type.file_ext.length !== 0) {
      if (!this.file.match(artifact_type.file_ext)) {
        return false;
      }
    }
  }
}
