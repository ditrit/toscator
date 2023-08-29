/**
 *
 */
export class ToscaProg {
  /**
   *
   */
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.imports = [];
    this.alreadyImported = [];
    this.service_templates = [];
  }

  /**
   *
   * @param tosca_type
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
   *
   */
  toString() {
    let str = 'prog: \n';
    for (const st in this.service_templates) {
      str += st.toString();
    }
    return str;
  }
}
