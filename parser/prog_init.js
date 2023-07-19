import { parse as parse_tosca } from "../schemas/tosca_1_3.js";
import listener from "../listener/listener.js";
import { ToscaServiceTemplate } from "../model/service_template.js";
import { LidyError } from "lidy-js";
import fs from "fs";
import path_mod from "path";
import request from "sync-request";
import { ToscaImport } from "../model/imports.js";
import { localNames, exportToParent, getRidOfNameCtg } from "./namespace.js";

export default function parse_file(file_import, parent_service_template, prog) {
   let src_data, res;
   let path = file_import.path;
   let namespace_uri = file_import.namespace_uri;
   let namespace_prefix = file_import.namespace_prefix;
   if (typeof path == "string") {
      if (path.slice(0, 4) == "http") {
         try {
            src_data = request("GET", path).getBody().toString();
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${path}`)
            );
            return null;
         }
      } else {
         try {
            src_data = fs.readFileSync(path, "utf8");
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${path}`)
            );
            return null;
         }
      }

      let current_service_template = new ToscaServiceTemplate();
      current_service_template.origin_file = file_import.file; // TODO Vérifier à quoi ça sert
      current_service_template.ns_uri = namespace_uri ? namespace_uri : "";
      current_service_template.ns_prefix = namespace_prefix
         ? namespace_prefix
         : "";
      // this isn't enough for deep importations
      prog.current_parent_service_template = parent_service_template;
      prog.current_service_template = current_service_template;

      let last_path = prog.last_path;
      let last_repo = prog.last_repo;
      res = parse_tosca({ // parse_tosca only modifies prog.cst because of exit_service_template
         src_data,
         listener,
         prog,
         path,
      });
      prog.service_templates.push(current_service_template);
      prog.alreadyImported.push(file_import);

      if (res.errors.length != 0) {
         res.errors.forEach((e) => {
            let err = e;
            err.originFile = file_import.file; // TODO Vérifier à quoi ça sert
            prog.errors.push(err);
         });
      } else {
         current_service_template.imports?.forEach((fi) => {
            // if it hasn't already been imported, then parse it
            if (!prog.alreadyImported.reduce((x, y) => x || fi.equals(y), false)) {
               fi.last_path = last_path;
               fi.last_repo = last_repo;
               parse_file(fi, current_service_template, prog);
            }
         });
      }
   } else {
      prog.errors.push(
         new LidyError("IMPORT_ERROR error", 0, `Can not read file ${path}`)
      );
      console.log(prog.errors.map((x) => x.message));
   }
   return res;
}




export function parseWithImports(file_import, parent_service_template, prog) {
   const current_service_template = simpleParse(listener, prog, file_import);
   // TO DO: const errors = prog.errors;

   localNames(current_service_template);
   const last_path = prog.last_path;
   const last_repo = prog.last_repo;
   current_service_template.imports?.forEach((file_imp) => {
      // if it hasn't already been imported, then parse it
      // TO DO: prevent importation cycling
      file_imp.last_path = last_path;
      file_imp.last_repo = last_repo;
      parseWithImports(file_imp, current_service_template, prog); 
   });

   if (parent_service_template) {
      exportToParent(file_import, parent_service_template, current_service_template);
      // TO DO: get rid of name_category attribute of ..._type ? (delete the value to save space)
   } else {
      // since we don't need the name_ctg anymore we return to the old (and correct) structure of ToscaServiceTemplate
      getRidOfNameCtg(current_service_template);
   }
   console.log("////////////////////////////// cst: " + current_service_template.origin_file + " //////////////////////////////")
   console.log(current_service_template)
   return current_service_template;
}

/**
 * parse the file without doing anything about the namespaces and the importations
 * @param {Array<function>} listener list of listeners to parse the file
 * @param {*} prog 
 * @param {ToscaImport} file to parse 
 * @returns {ToscaServiceTemplate} parsed file
 */
function simpleParse(listener, prog, file) {
   // TO DO: get rid of prog
   let src_data;
   let path = file.path;
   let namespace_uri = file.namespace_uri;
   let namespace_prefix = file.namespace_prefix;
   if (typeof path == "string") {
      if (path.slice(0, 4) == "http") {
         try {
            src_data = request("GET", path).getBody().toString();
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${path}`)
            );
            return null;
         }
      } else {
         try {
            src_data = fs.readFileSync(path, "utf8");
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${path}`)
            );
            return null;
         }
      }
      let current_service_template = new ToscaServiceTemplate();
      current_service_template.origin_file = file.file; // TODO Vérifier à quoi ça sert
      current_service_template.ns_uri = namespace_uri ? namespace_uri : "";
      current_service_template.ns_prefix = namespace_prefix
         ? namespace_prefix
         : "";
      prog.current_service_template = current_service_template;

      // TO DO: not enough to prevent cycling I believe (not enough accurate)
      prog.alreadyImported.push(file);
      parse_tosca({ 
         src_data,
         listener,
         prog,
         path,
      });
      return current_service_template;

   } else {
      prog.errors.push(
         new LidyError("IMPORT_ERROR error", 0, `Can not read file ${path}`)
      );
      console.log(prog.errors.map((x) => x.message));
   }
   
}
