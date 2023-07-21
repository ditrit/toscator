import { ToscaNode } from "./tosca_node.js";
import path from "path";
import {
   joinAndResolvePathOrUrl as joinAndResolve,
   is_url,
   getDomain,
} from "./utils.js";

export class ToscaImport extends ToscaNode {
   constructor(input, source) {
      super(source);
      this.file = input.file;
      this.last_path = input.last_path;
      this.last_repo = input.last_repo;
      this.repository = input.repository;
      this.namespace_prefix = input.namespace_prefix;
      this.namespace_uri = input.namespace_uri;
      this.setAbsolutePath();
   }

   toString() {
      return `\n    {Path: ${this.path}, \n    Repository: ${this.repository}, \n    Namespace_prefix: ${this.namespace_prefix}, \n    Namespace_uri: ${this.namespace_uri}}\n`;
   }

   static isValid(input, source) {
      return true;
   }

   setAbsolutePath() {
      if (this.repository) { // ??? repository is supposed to be a string, it doesn't have the attribute url...?
         this.last_repo = this.repository.url;
         this.last_path = this.repository.url;
      }

      if (is_url(this.file)) {
         if (this.last_repo) {
            this.last_repo = "";
         }
         this.last_path = path.dirname(this.file);
         this.path = this.file;
      } else {
         if (this.isRelative(this.file)) {
            console.log("relatif")
            this.path = joinAndResolve(this.last_path, this.file);
         } else {
            if (this.last_repo) {
               this.path = joinAndResolve(this.last_repo, this.file);
            } else if (is_url(this.last_path)) {
               joinAndResolve(getDomain(this.last_path), thisfile);
            } else {
               this.last_path = path.dirname(file);
               this.path = file;
            }
         }
      }

      console.log("old_path")
      console.log(this.path);
      this.path = path.resolve(path.dirname(this.source.ctx.prog.current_service_template.origin_file), this.file)
      console.log("new_path:");
      console.log(this.path);

      this.source.ctx.prog.last_path = this.last_path;
      this.source.ctx.prog.last_repo = this.last_repo;
   }

   isRelative(path_arg) {
      return !is_url(path_arg) || !path.isAbsolute(path_arg);
   }

   equals(other) {
      return (
         other instanceof ToscaImport &&
         this.path == other.path &&
         this.namespace_prefix == other.namespace_prefix &&
         this.namespace_uri == other.namespace_uri
      );
   }
}

export function newToscaImport(input, source) {
   let res;
   if (ToscaImport.isValid(input, source)) {
      res = new ToscaImport(input, source);
   } else {
      res = {};
   }
   return res;
}
