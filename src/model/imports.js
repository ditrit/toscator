import path from 'path';
import { ToscaNode } from './tosca_node.js';
import {
  is_url,
} from './utils.js';

/**
 *
 */
export class ToscaImport extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.file = input.file;
    this.repository = input.repository;
    this.namespace_prefix = input.namespace_prefix;
    this.namespace_uri = input.namespace_uri;
    // this.setAbsolutePath();
  }

  /**
   *
   */
  toString() {
    return `\n    {Path: ${this.path}, \n    Repository: ${this.repository}, \n    Namespace_prefix: ${this.namespace_prefix}, \n    Namespace_uri: ${this.namespace_uri}}\n`;
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    return true;
  }

  /**
   *
   */
  setAbsolutePath() {
    if (this.repository) {

    }

    if (is_url(this.file)) {
      this.path = this.file;
    } else {
      this.path = path.resolve(path.dirname(this.source.ctx.prog.origin_file), this.file);
    }
  }

  /**
   *
   * @param path_arg
   */
  isRelative(path_arg) {
    return !is_url(path_arg) || !path.isAbsolute(path_arg);
  }

  /**
   * @returns {ToscaRepository} The repository associated to the name import.repository
   */
  getRepository() {
    if (this.repository) {
      return this.source
        .ctx
        .prog
        .repositories?.find(
          (repo, repo_name) => repo_name === this.repository,
        );
    }
    return null;
  }

  /**
   *
   * @param other
   */
  equals(other) {
    return (
      other instanceof ToscaImport
         && this.path === other.path
         && this.namespace_prefix === other.namespace_prefix
         && this.namespace_uri === other.namespace_uri
    );
  }
}
