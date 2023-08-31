import { ToscaNode } from './tosca_node.js';

/**
 *
 */
export class ToscaNodeFilter extends ToscaNode {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(source);
    this.properties = input.properties;
    this.capabilities = input.capabilities;
  }

  /**
   *
   * @param node
   */
  passFilter(node) {
    let pass = true;

    this.properties?.forEach((double) => {
      const ppty_name = Object.keys(double)[0];
      const ppty = double[ppty_name];
      if (
        !node.properties?.get(ppty.name)
                || !ppty.passFilter(node.properties.get(ppty.name))
      ) {
        pass = false;
      }
    });
    this.capabilities?.forEach((double) => {
      const capa_name = Object.keys(double)[0];
      const capa = double[capa_name];
      if (
        !node.capabilities?.get(capa.name)
                || !capa.passFilter(node.capabilities.get(capa.name))
      ) {
        pass = false;
      }
    });
    return pass;
  }
}
