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
      // ??? repository is supposed to be a string, it doesn't have the attribute url...? It has but only in a service_template...
      // where it is a ToscaRepository
      // TO DO: What am I supposed to do with it ???
      if (this.repository) { 
         //this.last_repo = this.repository.url;
         //this.last_path = this.repository.url;
      }

      if (is_url(this.file)) {
         this.path = this.file; // the url is absolute since it starts with "<protocol>://..."
      } else {
         this.path = path.resolve(path.dirname(this.source.ctx.prog.origin_file), this.file);
      }
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
