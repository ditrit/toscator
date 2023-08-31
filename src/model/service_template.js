/**
 *
 */
export class ToscaServiceTemplate {
  /**
   *
   */
  constructor() {
    /**
     * @type {string}
     */
    this.tosca_definitions_version = undefined;
    this.description = {}; // TODO: esdoc type
    this.metadata = {}; // TODO: esdoc type
    this.imports = []; // TODO: esdoc type
    this.repositories = {}; // TODO: esdoc type
    this.namespace = { value: '' }; // TODO: esdoc type
    /**
     * Node types.
     * @type {Map<string, ToscaNodeType>}
     */
    this.node_types = new Map();
    /**
     * @type {Map<string, ToscaRelationshipType>}
     */
    this.relationship_types = new Map();
    /**
     * @type {Map<string, ToscaDataType>}
     */
    this.data_types = new Map();
    /**
     * @type {Map<string, ToscaCapabilityType>}
     */
    this.capability_types = new Map();
    /**
     * @type {Map<string, ToscaArtifactType>}
     */
    this.artifact_types = new Map();
    /**
     * @type {Map<string, ToscaGroupType>}
     */
    this.group_types = new Map();
    /**
     * @type {Map<string, ToscaInterfaceType>}
     */
    this.interface_types = new Map();
    /**
     * @type {Map<string, ToscaPolicyType>}
     */
    this.policy_types = new Map();

    // TODO: What are those ?
    this.topology_template = undefined; // TODO: esdoc type
    this.errors = []; // TODO: esdoc type
    this.warnings = []; // TODO: esdoc type
    this.tosca_types = []; // TODO: esdoc type
  }

  /**
   *
   * @param tosca_type
   * @returns {string}
   */
  toStringType(tosca_type) {
    let str = `\n ${tosca_type} : \n`;
    for (const key in this[tosca_type]) {
      const node_type = this[tosca_type][key];
      str += `    ${key}: ${node_type}\n`;
    }
    return str;
  }

  /**
   * @returns {string}
   */
  toString() {
    let str = 'prog: \n';
    for (const key in this) {
      if (key.endsWith('_types')) {
        str += this.toStringType(key);
      }
    }
    str += this.toStringType('metadata');
    // str+= `  Tosca version: ${this.tosca_definitions_version}\n`

    str += '\n  Imports: \n';
    this.imports.forEach((e) => str += e.toString());

    str += '\n  Repositories: \n    ';
    str += `${Object.entries(this.repositories)}`; // .reduce( e => str += `${e.toString()}`)
    str += 'End repoditories';

    str += '\n  Description: \n';
    str += `  ${this.description}`;
    return str;
  }
}
