import imports from "./imports.js";
import prog from "./prog.js";
import metadata from "./metadata.js";
import namespace from "./namespace.js";
import nodetype from "./node_type.js";
import repository from "./repository.js";
import version from "./version.js";
import servicetemplate from "./service_template.js";
import property from "./property.js";
import constraint from "./constraint.js";

export default {
   ...prog,
   ...imports,
   ...metadata,
   ...namespace,
   ...nodetype,
   ...repository,
   ...version,
   ...servicetemplate,
   ...property,
   ...constraint,
};
