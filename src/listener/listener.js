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
import bitrate from "./BitrateListener.js";
import size from "./size.js";
import time from "./time.js";
import frequency from "./frequency.js";
import attribute from "./attribute.js";
import capability from "./CapabilityListener.js";
import capability_type from "./CapabilityTypeListener.js";
import data_type from "./data_type.js";
import requirement from "./requirement.js";
import operation_def from "./operation_def.js";
import interface_type from "./interface_type.js";
import artifact_type from "./ArtifactTypeListener.js";
import artifact from "./ArtifactListener.js";
import implementation from "./implementation.js";
import group_type from "./group_type.js";
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
   ...operation_def,
   ...interface_type,
   ...artifact_type,
   ...artifact,
   ...implementation,
   ...group_type,
};
