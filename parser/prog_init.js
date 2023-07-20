import { parse as parse_tosca } from "../schemas/tosca_1_3.js";
import listener from "../listener/listener.js";
import { ToscaServiceTemplate } from "../model/service_template.js";
import { LidyError } from "lidy-js";
import fs from "fs";
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



/**
 * Parse the current_service_template
 * Import the service templates to import
 * Export the current_service_template to the parent if it exists
 * @param {ToscaImport} file_import = file to import that will become the current_service_template
 * @param {ToscaServiceTemplate} parent_service_template = service template importing the current_service_template
 * @param {*} prog 
 * @param {Array<String>} import_branch = list of the files imported in the current recursive branch
 * @returns 
 */
export function parseWithImports(file_import, parent_service_template, prog, import_branch) {
   const current_service_template = simpleParse(listener, prog, file_import);

   localNames(current_service_template);

   const last_path = prog.last_path;
   const last_repo = prog.last_repo;
   current_service_template.imports?.forEach((file_imp) => {
      // if it hasn't already been imported in this import_branch, then parse it
      if (!import_branch.includes(file_imp.path)) {
         file_imp.last_path = last_path; // necessary ?
         file_imp.last_repo = last_repo;
         const new_import_branch = JSON.parse(JSON.stringify(import_branch));
         new_import_branch.push(file_imp.path);
         parseWithImports(file_imp, current_service_template, prog, new_import_branch); 
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
 * @param {*} prog 
 * @param {ToscaImport} file to parse 
 * @returns {ToscaServiceTemplate} parsed file
 */
function simpleParse(listener, prog, file) {
   // TO DO: get rid of prog
   let src_data;
   let f_path = file.path;
   let namespace_uri = file.namespace_uri;
   let namespace_prefix = file.namespace_prefix;
   if (typeof f_path == "string") {
      if (f_path.slice(0, 4) == "http") {
         try {
            src_data = request("GET", f_path).getBody().toString();
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${_fpath}`)
            );
            return null;
         }
      } else {
         try {
            src_data = fs.readFileSync(f_path, "utf8");
         } catch (error) {
            prog.errors.push(
               new LidyError("File error", 0, `Can not read file ${f_path}`)
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

      parse_tosca({ 
         src_data,
         listener,
         prog,
         f_path,
      });
      return current_service_template;

   } else {
      prog.errors.push(
         new LidyError("IMPORT_ERROR error", 0, `Can not read file ${fpath}`)
      );
      console.log(prog.errors.map((x) => x.message));
   }
   
}
