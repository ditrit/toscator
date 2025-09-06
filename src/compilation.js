import fs from 'fs';
import path from 'path';
import { preprocess } from 'lidy-js/parser/node_parse.js';
import { Parser } from './parser/parse.js';
import { substitution } from './substitution/substitution.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

const primitiveTypes = [
  'string',
  'integer',
  'float',
  'boolean',
  'timestamp',
  'null',
  'version',
  'range',
  'list',
  'map',
  'scalar-unit.size',
  'scalar-unit.time',
  'scalar-unit.frequency',
  'scalar-unit.bitrate',
];

const toscaTypes = [
  'artifact_types',
  'capability_types',
  'data_types',
  'group_types',
  'interface_types',
  'node_types',
  'policy_types',
  'relationship_types',
];

/**
 * Recursively validates constraints for primitive types, resolves a type, and makes the node
 * inherit from its parent type.
 * @param {string} parentName - The name of the parent type to validate and resolve.
 * @param {object} node - The node to make heir.
 * @param {object} serviceTemplate - The service template containing all types.
 * @param {string} nodeName - The optionnal node name for error reporting.
 * @returns {ToscaNode} The completed heir node.
 */
function validateResolveAndInherit(parentName, node, serviceTemplate, nodeName) {
  if (primitiveTypes.includes(parentName)) {
    node.validate();

    return node;
  }

  const matchingTypeMap = toscaTypes.find((typesMap) => serviceTemplate[typesMap]?.has(parentName));

  // If the type is found in the service template, make the node validateResolveAndInherit from it.
  if (matchingTypeMap) {
    const parent = serviceTemplate[matchingTypeMap]?.get(parentName);
    let completedParent;

    if (node.derived_from || node.type) {
      completedParent = validateResolveAndInherit(
        node.derived_from || node.type,
        parent,
        serviceTemplate,
      );
    }

    if (completedParent) {
      node.inheritFrom(completedParent);
    }

    return node;
  }

  // TODO: Give the corresponding line of code in the error. Do this for all errors.
  throw new Error(`Unknown type: '${parentName}' type not found in '${nodeName || node.name}'.`);
}

/**
 * Make types validateResolveAndInherit from their parents within all TOSCA type maps.
 * @param {object} serviceTemplate - The service template containing all types.
 */
function validateResolveAndInheritTypes(serviceTemplate) {
  toscaTypes.forEach((typeName) => {
    if (serviceTemplate[typeName]) {
      for (const type of serviceTemplate[typeName].values()) {
        if (type.derived_from) {
          validateResolveAndInherit(type.derived_from, type, serviceTemplate);
        }

        if (type.attributes) {
          for (const attribute of type.attributes.values()) {
            validateResolveAndInherit(attribute.type, attribute, serviceTemplate);

            if (attribute.entry_schema) {
              validateResolveAndInherit(
                attribute.entry_schema.type,
                attribute.entry_schema,
                serviceTemplate,
                'entry_schema',
              );
            }
          }
        }

        if (type.capabilities) {
          for (const capability of type.capabilities.values()) {
            validateResolveAndInherit(capability.type, capability, serviceTemplate);
          }
        }

        if (type.properties) {
          for (const property of type.properties.values()) {
            validateResolveAndInherit(property.type, property, serviceTemplate);
          }
        }

        if (type.requirements) {
          type.requirements.forEach((requirement) => {
            for (const requirementValue of Object.values(requirement)) {
              if (requirementValue.capability) {
                validateResolveAndInherit(
                  requirementValue.capability,
                  requirementValue,
                  serviceTemplate,
                );
              }

              if (requirementValue.node) {
                validateResolveAndInherit(requirementValue.node, requirementValue, serviceTemplate);
              }

              if (requirementValue.relationship?.type) {
                validateResolveAndInherit(
                  requirementValue.relationship.type,
                  requirementValue,
                  serviceTemplate,
                );
              }
            }
          });
        }
      }
    }
  });
}

/**
 * Instanciate a node template from its parent type.
 * @param {string} parentName - The name of the parent type to instanciate from.
 * @param {object} nodeTemplate - The node template to instanciate.
 * @param {object} serviceTemplate - The service template containing all types.
 * @param {string} nodeName - The optionnal node name for error reporting.
 * @returns {ToscaNode} The instanciated node template.
 */
function instanciate(parentName, nodeTemplate, serviceTemplate, nodeName) {
  // Check if the type is found in the TOSCA types.
  const matchingTypeMap = toscaTypes.find((typesMap) => serviceTemplate[typesMap]?.has(parentName));

  // Check if the type is found in the topology template.
  const matchingTemplate = serviceTemplate.topology_template
    && ['groups', 'inputs', 'node_templates', 'relationship_templates']
      .find((template) => serviceTemplate.topology_template[template]
        && serviceTemplate.topology_template[template]?.has(parentName));

  // If the type is found, make the node validateResolveAndInherit from it.
  if (matchingTypeMap || matchingTemplate || primitiveTypes.includes(parentName)) {
    const parentType = serviceTemplate[matchingTypeMap || matchingTemplate]?.get(parentName);

    nodeTemplate.instanciateFrom(parentType);

    return nodeTemplate;
  }

  throw new Error(`Unknown type: '${parentName}' type not found in '${nodeName || nodeTemplate.name}'.`);
}

/**
 * Instanciate all node templates within a topology template.
 * @param {object} serviceTemplate - The service template containing all types.
 */
function instanciateNodeTemplates(serviceTemplate) {
  const {
    node_templates,
    relationship_templates,
    groups,
    inputs,
    outputs,
    policies,
  } = serviceTemplate.topology_template;

  if (node_templates) {
    for (const nodeTemplate of node_templates.values()) {
      instanciate(nodeTemplate.type, nodeTemplate, serviceTemplate);

      if (nodeTemplate.artifacts) {
        for (const artifact of nodeTemplate.artifacts.values()) {
          instanciate(artifact.type, artifact, serviceTemplate);
        }
      }

      if (nodeTemplate.capabilities) {
        for (const capability of nodeTemplate.capabilities.values()) {
          if (capability.properties) {
            for (const property of capability.properties.values()) {
              if (property.value?.get_input) {
                const input = property.value.get_input.value;
                const inputType = Array.isArray(input) ? input[0].value : input;

                instanciate(inputType, property.value, serviceTemplate, property.name);
              }
            }
          }
        }
      }

      if (nodeTemplate.instance_count) {
        if (nodeTemplate.instance_count.get_input) {
          instanciate(
            nodeTemplate.instance_count.get_input.value,
            nodeTemplate.instance_count,
            serviceTemplate,
            'instance_count',
          );
        }
      }

      if (nodeTemplate.properties) {
        for (const property of nodeTemplate.properties.values()) {
          if (property.value?.get_input) {
            const input = property.value.get_input.value;
            const inputType = Array.isArray(input) ? input[0].value : input;

            instanciate(inputType, property.value, serviceTemplate, property.name);
          }
        }
      }

      if (nodeTemplate.requirements) {
        for (const requirement of nodeTemplate.requirements.values()) {
          for (const requirementValue of Object.values(requirement)) {
            if (requirementValue.node) {
              instanciate(requirementValue.node, requirementValue, serviceTemplate);
            }

            if (requirementValue.relationship) {
              instanciate(requirementValue.relationship, requirementValue, serviceTemplate);
            }
          }
        }
      }
    }
  }

  if (relationship_templates) {
    for (const relationshipTemplate of relationship_templates.values()) {
      instanciate(relationshipTemplate.type, relationshipTemplate, serviceTemplate);
    }
  }

  if (groups) {
    for (const group of groups.values()) {
      instanciate(group.type, group, serviceTemplate);

      if (group.members) {
        instanciate(group.members[0], group, serviceTemplate);
      }
    }
  }

  if (inputs) {
    for (const input of inputs.values()) {
      instanciate(input.type, input, serviceTemplate);

      if (input.entry_schema) {
        instanciate(input.entry_schema.type, input.entry_schema, serviceTemplate);
      }
    }
  }

  if (outputs) {
    for (const output of outputs.values()) {
      if (output.value.get_attribute) {
        instanciate(
          output.value.get_attribute.value[0].value,
          output.value,
          serviceTemplate,
          'value',
        );
      }
    }
  }

  if (policies) {
    for (const policy of policies.values()) {
      for (const policyValue of Object.values(policy)) {
        instanciate(policyValue.type, policyValue, serviceTemplate);

        if (policyValue.targets) {
          instanciate(policyValue.targets[0], policyValue, serviceTemplate);
        }
      }
    }
  }

/* Note: This part might conflict with the substitution function. Uncomment if needed.

  const substitutionMappings = serviceTemplate.topology_template.substitution_mappings;

  if (substitutionMappings) {
    instanciate(
      substitutionMappings.node_type,
      substitutionMappings,
      serviceTemplate,
      'node_type',
    );

    if (substitutionMappings.capabilities) {
      for (const capability of substitutionMappings.capabilities.values()) {
        if (capability.mapping) {
          instanciate(capability.mapping[0], capability, serviceTemplate);
        }
      }
    }
  } */
}

/**
 * Parse the file, resolve types and substitute abstract nodes
 * @param {string} src - Path to the file to compile.
 * @param {string} [patterns_dir] - Path to the directory containing patterns.
 * @returns {ToscaServiceTemplate} Compiled service template.
 */
export function compile(src, patterns_dir = undefined) {
  // preprocess('src/schemas/tosca_1_3.yaml');
  // Parse the file
  // Note: In case of grammar changes, use this function (more details in the README).
  const parser = new Parser(new NodeJsFileManager());
  const serviceTemplate = parser.parse(src);

  validateResolveAndInheritTypes(serviceTemplate);

  if (serviceTemplate.topology_template) {
    instanciateNodeTemplates(serviceTemplate);
  }

  // Substitute abstract nodes
  /**
   * TODO: modify this method: create a new service_template that will import src and the patterns
   * instead if having a list of parsed patterns. Therefore there won't be any namespace issues
   */

  const list_cst = [];
  if (patterns_dir) {
    const patterns = fs
      .readdirSync(patterns_dir)
    // Doesn't guarantee that it's a tosca file.
      .filter((pattern_path) => ['.yml', '.yaml'].includes(path.extname(pattern_path)));

    // TODO: can optimize by parsing then checking if it can be a substitute and then break the loop
    // can also only parse the node_templates using the keywords argument of parse() and then
    // fully parse if it is a substitute
    patterns.forEach((pattern) => {
      list_cst.push(parser.parse(path.join(patterns_dir, pattern)));
    });
  }

  substitution(serviceTemplate, list_cst);

  return serviceTemplate;
}
