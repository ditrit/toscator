import path from 'path';
import fs from 'fs';
import { LidyError } from 'lidy-js';
import { getProtocol, is_url } from '#src/model/utils.js';

export class AbstractFileManager {
  /**
   * TODO: handle the different protocols.
   * TODO: can we have a local repository...? If yes then modify the else {}
   * TODO: I created this function for importation: we want the file in string, but is that
   * the case for all artifacts ?
   * @param {string} cst_path = absolute path the current_service_template
   * @param {string} f_path = relative path from the current_service_template to the
   * artifact or from the repository to the artifact
   * @param {ToscaRepository} repository - Repository.
   * @param {any[]} errors - Errors.
   * @returns {*} the file in text and its absolute path
   */
  getArtifact(cst_path, f_path, repository, errors) {
    const abs_path = this.getAbsolutePath(repository, f_path, cst_path);
    if (is_url(abs_path)) {
      /**
       * Identify the protocol and then execute the corresponding function to
       * get the artifact
       * TODO: add the handling of the other protocols
       */
      switch (getProtocol(abs_path)) {
        case 'http': // TO DO: getArtifactHttps hasn't been implemented
        {
          const src_data = this.getArtifactHttp(abs_path, repository, errors);
          return {
            src_data,
            abs_path,
          };
        }
      }
    } else {
      const src_data = this.getArtifactLocalFile(abs_path, errors);
      return {
        src_data,
        abs_path,
      };
    }
  }

  /**
   * Read the local file
   * @param {string} abs_path absolute path to the file to read
   * @param {*} errors
   * @returns {string} the file as a string
   * @abstract
   */
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  getArtifactLocalFile(abs_path, errors) {
    throw new Error('abstract method');
  }

  /**
   * get the file from the http address as a string
   * @param {*} abs_path
   * @param {*} repository
   * @param {*} errors
   * @returns {string} the file as a string
   * @abstract
   */
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  getArtifactHttp(abs_path, repository, errors) {
    throw new Error('abstract method');
  }

  /**
   *
   * @param {ToscaRepository} repository
   * @param {string} f_path file: relative path from the repository or the cst to the file
   * @param {string} cst_path absolute path to the current_service_template
   * @returns {string} the absolute path to the file
   * @abstract
   */
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  getAbsolutePath(repository, f_path, cst_path) {
    throw new Error('abstract method');
  }
}

export class NodeJsFileManager extends AbstractFileManager {
  /**
   * Read the local file
   * @param {string} abs_path absolute path to the file to read
   * @param {any[]} errors - Errors.
   * @returns {string} the file as a string
   */
  getArtifactLocalFile(abs_path, errors) {
    try {
      return fs.readFileSync(abs_path, 'utf8');
    } catch (error) {
      errors.push(
        new LidyError('File error', 0, `Can not read file ${abs_path}`),
      );
      throw error;
    }
  }

  /**
   * TODO: implement it
   * get the file from the http address as a string
   * @param {*} abs_path
   * @param {*} repository
   * @param {any[]} errors
   * @returns {string} the file as a string
   */
  getArtifactHttp(abs_path, repository, errors) {
    throw Error('not implemented');
  }

  /**
   *
   * @param {ToscaRepository?} repository - Repository.
   * @param {string} f_path file: relative path from the repository or the cst to the file
   * @param {string} cst_path absolute path to the current_service_template
   * @returns {string} the absolute path to the file
   */
  getAbsolutePath(repository, f_path, cst_path) {
    // TODO: fix. repository.path does not exist.
    /*
    if (repository) {
      if (path.isAbsolute(f_path) || is_url(f_path)) {
        return f_path;
      }
      if (path.isAbsolute(repository.path) || is_url(repository.path)) {
        return path.resolve(path.dirname(repository.path), f_path);
      }

      return path.resolve(
        path.dirname(cst_path),
        path.dirname(repository.path),
        f_path,
      );
    } */
    if (path.isAbsolute(f_path) || is_url(f_path)) {
      return f_path;
    }
    return path.resolve(path.dirname(cst_path), f_path);
  }
}
class BrowserFileManager extends AbstractFileManager {
  getAbsolutePath(repository, f_path, cst_path) {
    throw Error('not implemented yet'); // TODO: implement
  }

  getArtifact(cst_path, f_path, repository, errors) {
    throw Error('not implemented yet'); // TODO: implement
  }

  getArtifactHttp(abs_path, repository, errors) {
    throw Error('not implemented yet'); // TODO: implement
  }

  getArtifactLocalFile(abs_path, errors) {
    throw Error('not implemented yet'); // TODO: implement
  }
}
