import { ToscaNode } from './tosca_node.js';

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
   */
  getClassname() {
    return ToscaArtifact._classname;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    // TODO: add file path validation
    if (typeof input.file !== 'string') {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for Artifact',
      );
      return false;
    }
    return true;
  }

  /**
   *
   * @param service_template
   */
  static correctGrammar(service_template) {
    const artifact_type = service_template.artifact_types[this.type];
    // mime_type...?
    if (artifact_type.file_ext.length !== 0) {
      if (!this.file.match(artifact_type.file_ext)) {
        return false;
      }
    }
  }
}

/**
 *
 * @param input
 * @param source
 */
export function newToscaArtifact(input, source) {
  let res;
  if (ToscaArtifact.isValid(input, source)) {
    res = new ToscaArtifact(input, source);
  } else {
    res = {};
  }
  return res;
}
