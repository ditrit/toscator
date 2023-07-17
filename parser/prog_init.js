import { parse as parse_tosca } from "../schemas/tosca_1_3.js";
import listener from "../listener/listener.js";
import { ToscaServiceTemplate } from "../model/service_template.js";
import { LidyError } from "lidy-js";
import fs from "fs";
import path_mod from "path";
import request from "sync-request";

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
      res = parse_tosca({
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
