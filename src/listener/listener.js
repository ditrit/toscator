import imports from './imports.js';
import prog from './prog.js';
import metadata from './metadata.js';
import namespace from './namespace.js';
import nodetype from './node_type.js';
import repository from './repository.js';
import version from './version.js';
import servicetemplate from './service_template.js';
import property from './property.js';
import constraint from './constraint.js';
import bitrate from './bitrate.js';
import size from './size.js';
import time from './time.js';
import frequency from './frequency.js';
import attribute from './attribute.js';
import capability from './capability.js';
import * as capability_type from './capability_type.js';
import data_type from './data_type.js';
import requirement from './requirement.js';
import operation_def from './operation_def.js';
import interface_type from './interface_type.js';
import artifact_type from './artifact_type.js';
import artifact from './artifact.js';
import notification_implementation from './notification_implementation.js.js';
import operation_implementation from './operation_implementation.js';
import group_type from './group_type.js';
import parameter_assignment from './parameter_assignment.js';
import capability_mapping from './capability_mapping.js';
import schema_def from './schema_def.js';
import group_def from './group_def.js';
import imperative_workflow_step from './imperative_workflow_step.js';
import node_filter from './node_filter.js';
import node_template from './node_template.js';
import policy_def from './policy_def.js';
import relationship_template from './relationship_template.js';
import requirement_mapping from './requirement_mapping.js';
import substitution_mappings from './substitution_mappings.js';
import target_filter from './target_filter.js';
import workflow_activity_inline from './workflow_activity_inline.js';
import workflow_condition_operator from './workflow_condition_operator.js';
import workflow_precondition from './workflow_precondition.js';
import input_parameter from './input_parameter.js';
import output_parameter from './output_parameter.js';
import operation_assignment from './operation_assignment.js';
import interface_def from './interface_def.js';
import interface_assignment from './interface_assignment.js';
import capability_assignment from './capability_assignment.js';
import relationship_def from './relationship_def.js';
import relationship_assignment from './relationship_assignment.js';
import imperative_workflow_def from './imperative_workflow_def.js';
import notification_def from './notification_def.js';
import capability_filter from './capability_filter.js';
import requirement_assignment from './requirement_assignment.js';
import property_filter from './property_filter.js';
import topology_template from './topology_template.js';
import attribute_mapping from './attribute_mapping.js';
import relationship_type from './relationship_type.js';
import time_interval from './time_interval.js';
import condition from './condition.js';
import policy_type from './policy_type.js';
import trigger_def from './trigger_def.js';
import workflow_activity_call_operation from './workflow_activity_call_operation.js';
import workflow_activity from './workflow_activity.js';
import property_mapping from './property_mapping.js';
import interface_mapping from './interface_mapping.js';

/**
 * Listener.
 * @typedef {{}} Listener
 */

/**
 * Exported listener.
  @type {Listener}
 */
export const listenerObject = {
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
  ...operation_implementation,
  ...notification_implementation,
  ...group_type,
  ...parameter_assignment,
  ...capability_mapping,
  ...schema_def,
  ...group_def,
  // ...imperative_workflow_step,
  ...node_filter,
  ...node_template,
  ...policy_def,
  ...relationship_template,
  ...requirement_mapping,
  ...substitution_mappings,
  ...target_filter,
  ...workflow_activity_inline,
  ...workflow_condition_operator,
  // ...workflow_precondition,
  ...input_parameter,
  ...output_parameter,
  ...operation_assignment,
  ...interface_def,
  ...interface_assignment,
  ...capability_assignment,
  ...relationship_def,
  ...relationship_assignment,
  // ...imperative_workflow_def,
  ...notification_def,
  ...capability_filter,
  ...requirement_assignment,
  ...property_filter,
  ...topology_template,
  ...attribute_mapping,
  ...relationship_type,
  ...time_interval,
  ...condition,
  ...policy_type,
  ...trigger_def,
  ...workflow_activity_call_operation,
  ...workflow_activity,
  ...property_mapping,
  ...interface_mapping,
};
