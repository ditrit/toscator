import { ToscaType } from './tosca_type.js';

/**
 *
 */
export class ToscaArtifactType extends ToscaType {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.file_ext = input.file_ext;
    this.properties = input.properties;
    this.mime_type = input.mime_type;
  }

  static _classname = 'artifact_type';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    if (!ToscaType.isValid(input, source)) {
      source.ctx.typeError(
        source.current,
        'Incorrect definition for ArtifactType',
      );
      return false;
    }

    // TODO: Add valid extensions to check file_ext
    if (!input.file_ext.every((ele) => typeof ele === 'string')) {
      return false;
    }
    return true;
  }
}
