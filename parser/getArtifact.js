import { ToscaRepository } from "../model/repository.js";
import { getProtocol, is_url } from "../model/utils.js";
import { LidyError } from "lidy-js";
import path from "path";
import fs from "fs";

/**
 * TO DO: handle the different protocols. 
 * TO DO: can we have a local repository...? If yes then modify the else {}
 * TO DO: I created this function for importation: we want the file in string, but is that
 * the case for all artifacts ?
 * @param {String} cst_path = absolute path the current_service_template
 * @param {String} path = relative path from the current_service_template to the 
 * artifact or from the repository to the artifact
 * @param {ToscaRepository} repository
 * @param {Array<LidyError>} errors
 * @returns the file in text and its absolute path
 */
export function getArtifact(cst_path, f_path, repository, errors) {
    const abs_path = getAbsolutePath(repository, f_path, cst_path);
    if (is_url(abs_path)) {
        /**
         * Identify the protocol and then execute the corresponding function to
         * get the artifact
         * TO DO: add the handling of the other protocols
         */
        switch (getProtocol(abs_path)) {
            case "http": // TO DO: getArtifactHttps hasn't been implemented
                const src_data = getArtifactHttp(abs_path, repository, errors);
                return  {
                    "src_data": src_data,
                    "abs_path": abs_path
                };
        }
    } else {
        const src_data = getArtifactLocalFile(abs_path, errors);
        return  {
            "src_data": src_data,
            "abs_path": abs_path
        };
    }
}

/**
 * Read the local file
 * @param {String} abs_path absolute path to the file to read
 * @param {*} errors 
 * @returns {String} the file as a string
 */
function getArtifactLocalFile(abs_path, errors) {
    try {
        return fs.readFileSync(abs_path, "utf8");
    } catch (error) {
        errors.push(
            new LidyError("File error", 0, `Can not read file ${abs_path}`)
        );
    }
}

/**
 * TO DO: implement it
 * get the file from the http address as a string
 * @param {*} abs_path 
 * @param {*} repository 
 * @param {*} errors 
 * @returns {String} the file as a string
 */
function getArtifactHttp(abs_path, repository, errors) {

}

/**
 * 
 * @param {ToscaRepository} repository 
 * @param {String} f_path file: relative path from the repository or the cst to the file
 * @param {String} cst_path absolute path to the current_service_template
 * @returns {String} the absolute path to the file
 */
export function getAbsolutePath(repository, f_path, cst_path) {
    if (repository) { 
        if (path.isAbsolute(f_path) || is_url(f_path)) {
            return f_path;
        } else {
            if (path.isAbsolute(repository.path) || is_url(repository.path)) {
                return path.resolve(path.dirname(repository.path), f_path);
            } else {
                return path.resolve(
                    path.dirname(cst_path),
                    path.dirname(repository.path),
                    f_path);
            }
        }
    } else {
        if (path.isAbsolute(f_path) || is_url(f_path)) {
            return f_path;
        } else {
            return path.resolve(path.dirname(cst_path), f_path);
        }
    }
}