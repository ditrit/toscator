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
import bitrate from "./bitrate.js";
import size from "./size.js";
import time from "./time.js";
import frequency from "./frequency.js";
import attribute from "./attribute.js";
import capability from "./capability.js";
import capability_type from "./capability_type.js";
import data_type from "./data_type.js";
import requirement from "./requirement.js";
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
   ...bitrate,
   ...size,
   ...time,
   ...frequency,
   ...attribute,
   ...capability_type,
   ...capability,
   ...requirement,
   ...data_type,
};
