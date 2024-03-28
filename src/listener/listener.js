import imports from './impl/imports.js';
import metadata from './impl/metadata.js';
import namespace from './impl/namespace.js';
import nodetype from './impl/node_type.js';
import repository from './impl/repository.js';
import version from './impl/version.js';
import servicetemplate from './impl/service_template.js';
import property_def from './impl/property/property_def.js';
import constraint from './impl/constraint.js';
import bitrate from './impl/bitrate.js';
import size from './impl/size.js';
import time from './impl/time.js';
import frequency from './impl/frequency.js';
import attribute_def from './impl/attribute/attribute_def.js';
import capability_def from './impl/capability/capability_def.js';
import * as capability_type from './impl/capability/capability_type.js';
import data_type from './impl/data_type.js';
import requirement_def from './impl/requirement/requirement_def.js';
import operation_def from './impl/operation/operation_def.js';
import interface_type from './impl/interface/interface_type.js';
import artifact_type from './impl/artifact/artifact_type.js';
import artifact_def from './impl/artifact/artifact_def.js';
import notification_implementation from './impl/notification/notification_implementation.js.js';
import operation_implementation from './impl/operation/operation_implementation.js';
import group_type from './impl/group/group_type.js';
import parameter_assignment from './impl/parameter/parameter_assignment.js';
import capability_mapping from './impl/capability/capability_mapping.js';
import schema_def from './impl/schema_def.js';
import group_def from './impl/group/group_def.js';
// import imperative_workflow_step from './impl/workflow/imperative_workflow_step.js';
import node_filter from './impl/node_filter.js';
import node_template from './impl/node_template.js';
import policy_def from './impl/policy/policy_def.js';
import relationship_template from './impl/relationship/relationship_template.js';
import requirement_mapping from './impl/requirement/requirement_mapping.js';
import substitution_mappings from './impl/substitution_mappings.js';
import target_filter from './impl/target_filter.js';
import workflow_activity_inline from './impl/workflow/workflow_activity_inline.js';
import workflow_condition_operator from './impl/workflow/workflow_condition_operator.js';
// import workflow_precondition from './impl/workflow/workflow_precondition.js';
import input_parameter from './impl/input_parameter.js';
import output_parameter from './impl/output_parameter.js';
import operation_assignment from './impl/operation/operation_assignment.js';
import interface_def from './impl/interface/interface_def.js';
import interface_assignment from './impl/interface/interface_assignment.js';
import capability_assignment from './impl/capability/capability_assignment.js';
import relationship_def from './impl/relationship/relationship_def.js';
import relationship_assignment from './impl/relationship/relationship_assignment.js';
// import imperative_workflow_def from './impl/workflow/imperative_workflow_def.js';
import notification_def from './impl/notification/notification_def.js';
import capability_filter from './impl/capability/capability_filter.js';
import requirement_assignment from './impl/requirement/requirement_assignment.js';
import property_filter from './impl/property/property_filter.js';
import topology_template from './impl/topology_template.js';
import attribute_mapping from './impl/attribute/attribute_mapping.js';
import relationship_type from './impl/relationship/relationship_type.js';
import time_interval from './impl/time_interval.js';
import condition from './impl/condition.js';
import policy_type from './impl/policy/policy_type.js';
import trigger_def from './impl/trigger_def.js';
import workflow_activity_call_operation from './impl/workflow/workflow_activity_call_operation.js';
import workflow_activity from './impl/workflow/workflow_activity.js';
import property_mapping from './impl/property/property_mapping.js';
import interface_mapping from './impl/interface/interface_mapping.js';

/**
 * Listener.
 * @typedef {{}} Listener
 */

/**
 * Exported listener.
  @type {Listener}
 */
export const listenerObject = {
  ...imports,
  ...metadata,
  ...namespace,
  ...nodetype,
  ...repository,
  ...version,
  ...servicetemplate,
  ...property_def,
  ...constraint,
  ...bitrate,
  ...size,
  ...time,
  ...frequency,
  ...attribute_def,
  ...capability_type,
  ...capability_def,
  ...requirement_def,
  ...data_type,
  ...operation_def,
  ...interface_type,
  ...artifact_type,
  ...artifact_def,
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
