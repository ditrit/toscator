import { parse as parse_tosca } from "../schemas/tosca_1_3.js";
import listener from "../listener/listener.js";
import { ToscaServiceTemplate } from "../model/service_template.js";
import { LidyError } from "lidy-js";
import fs from "fs";
import request from "sync-request";
import { ToscaImport } from "../model/imports.js";
import { localNames, exportToParent, getRidOfNameCtg } from "./namespace.js";
import path from "path";
import { getAbsolutePath, getArtifact } from "./getArtifact.js";


/**
 * Parse the current_service_template
 * Import the service templates to import
 * Export the current_service_template to the parent if it exists
 * @param {ToscaImport} file_import = file to import that will become the current_service_template
 * @param {ToscaServiceTemplate} parent_service_template = service template importing the current_service_template
 * @param {*} errors
 * @param {Array<String>} import_branch = list of the files imported in the current recursive branch
 * @returns 
 */
export function parseWithImports(file_import, parent_service_template, errors, import_branch) {
   // Note: can optimize here by giving last element of import_branch which is abs_path
   // as an argument so that getartifact() doesn't have to find get it itself
   const {src_data, abs_path} = getArtifact(
      file_import.source.ctx.prog.origin_file,
      file_import.file,
      file_import.getRepository(),
      errors
   );
   
   const current_service_template = simpleParse(listener, file_import, src_data, abs_path);

   localNames(current_service_template);

   current_service_template.imports?.forEach((file_imp) => {
      // if it hasn't already been imported in this import_branch, then parse it
      const imp_abs_path = getAbsolutePath(file_imp.repository, file_imp.file, file_imp.source.ctx.prog.origin_file)
      if (!import_branch.includes(imp_abs_path)) {
         const new_import_branch = JSON.parse(JSON.stringify(import_branch));
         new_import_branch.push(imp_abs_path);
         parseWithImports(file_imp, current_service_template, errors, new_import_branch);
      }
   });

   if (parent_service_template) {
      exportToParent(file_import, parent_service_template, current_service_template);
   } else {
      // since we don't need the name_ctg anymore we return to the old (and correct) structure of ToscaServiceTemplate
      getRidOfNameCtg(current_service_template);
   }
   console.log("////////////////////////////// cst: " + current_service_template.origin_file + " //////////////////////////////")
   //console.log(current_service_template)
   console.log(import_branch);
   return current_service_template;
}

/**
 * parse the file without doing anything about the namespaces and the importations
 * @param {Array<function>} listener list of listeners to parse the file
 * @param {ToscaImport} file to parse 
 * @param {String} src_data = file to parse in string
 * @param {String} abs_path = absolute path to the file
 * @returns {ToscaServiceTemplate} parsed file
 */
function simpleParse(listener, file, src_data, abs_path) {
   let namespace_uri = file.namespace_uri;
   let namespace_prefix = file.namespace_prefix;
   
   let current_service_template = new ToscaServiceTemplate();
   current_service_template.origin_file = abs_path;
   current_service_template.ns_uri = namespace_uri ? namespace_uri : "";
   current_service_template.ns_prefix = namespace_prefix
      ? namespace_prefix
      : "";

   parse_tosca({ 
      src_data,
      listener,
      prog: current_service_template,
      abs_path,
   });
   /*
   // Note: I can do it here or just before importing in the for loop of the parseWithImport
   for (const i in current_service_template.imports) {
      current_service_template.imports[i].setAbsolutePath();
      //current_service_template.imports[i].getImport();
   }*/
   return current_service_template;
}

