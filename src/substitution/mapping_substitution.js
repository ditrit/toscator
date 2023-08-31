import { ToscaNodeTemplate } from '#src/model/node_template.js';
import { ToscaRequirementAssignment } from '#src/model/requirement_assignment.js';
import { ToscaServiceTemplate } from '#src/model/service_template.js';
import { ToscaTopologyTemplate } from '#src/model/topology_template.js';

/**
 * Substitute the abstract node with a topology_template from one of the service_template in list_st
 * @param {ToscaServiceTemplate} cst = service template containing the abstract node
 * @param {ToscaNodeTemplate} node = abstract node to substitute
 * @param {Array<ToscaServiceTemplate>} list_st = patterns used to substitute
 */
export function mappingSubstitution(cst, node, list_st) {
  const topo_temp = selectSubstituteServiceTemplate(node, list_st);

  if (topo_temp) {
    // add the elements of the substitute topology_template
    addTopology(cst, topo_temp);

    // link the elements of the topology_template to the cst
    linkTopology(cst, node, topo_temp);

    // delete the abstract_node
    cst.topology_template.node_templates.delete(node.name);
  }
}

/**
 * Choose the topology template to substitute the abstract node
 * TO DO: are substitution_filter and node_type enough ? Or should we add more ?
 * @param {ToscaNodeTemplate} node = abstract node to substitute
 * @param {Array<ToscaServiceTemplate>} list_st = patterns used to substitute
 * @returns {ToscaTopologyTemplate} substitute
 */
export function selectSubstituteServiceTemplate(node, list_st) {
  const sub_st_candidates = list_st.filter((st) => {
    if (st.topology_template?.substitution_mappings?.node_type === node.type) {
      const node_filter = st.topology_template.substitution_mappings.substitution_filter;
      if (node_filter && !node_filter.passFilter(node)) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  });
    // Note: all those topology_template can be used to substitute this abstract node so
    // we choose the 1st one for now ?
  const topo_temp = sub_st_candidates[0]?.topology_template;
  return topo_temp;
}

/**
 * Add the elements of the topology_template to the current_service_template
 * @param {ToscaServiceTemplate} cst = current_service_template that contains the abstract node
 * @param {ToscaTopologyTemplate} topo_temp = topology_template that substitute the abstract node
 */
export function addTopology(cst, topo_temp) {
  for (const key of Object.keys(topo_temp)) {
    if (key !== 'description'
        && key !== 'substitution_mappings'
        && key !== 'source') {
      if (key === 'policies') {
        topo_temp[key]?.forEach((policy) => {
          let duplicate = false;
          cst.topology_template[key].forEach((p) => {
            if (p.name === policy.name) {
              duplicate = true;
            }
          });
          if (!duplicate) {
            if (!cst.topology_template[key]) {
              cst.topology_template[key] = [];
            }
            cst.topology_template[key].push(policy);
          }
        });
      } else {
        topo_temp[key]?.forEach((val, name) => {
          let duplicate = false;
          cst.topology_template[key]?.forEach((v, n) => {
            if (n === name) {
              duplicate = true;
            }
          });
          if (!duplicate) {
            if (!cst.topology_template[key]) {
              cst.topology_template[key] = new Map();
            }
            cst.topology_template[key].set(name, val);
          }
        });
      }
    }
  }
}

/**
 * Link the elements of the topology_template substituting the abstract node to the current_service_template
 * @param {ToscaServiceTemplate} cst = current_service_template that contains the abstract node
 * @param {ToscaNodeTemplate} abstract_node
 * @param {ToscaTopologyTemplate} topo_temp = topology_template that substitute the abstract node
 */
export function linkTopology(cst, abstract_node, topo_temp) {
  // requirement_assignments
  cst.topology_template.node_templates.forEach((cst_node) => {
    const sub_requirements = [];
    cst_node.requirements?.forEach((req) => {
      const cst_req_name = Object.keys(req)[0];
      if (req[cst_req_name].node === abstract_node.name) {
        if (req[cst_req_name].capability) {
          const sub_req = topo_temp.substitution_mappings.capabilities.get(req[cst_req_name].capability);
          req[cst_req_name].node = sub_req.mapping[0];
          req[cst_req_name].capability = sub_req.mapping[1];
        } else {
          // Note: if a node requires an abstract node, then all the node from the topology template substituting it are requirements of the first node
          // Pb: I have to create new requirements as well as deleting a requirement. Which may lead to issues with namespaces or other things that refer to the deleted requirement
          topo_temp.node_templates.forEach((topo_temp_node, topo_temp_node_name) => {
            const requirement = new ToscaRequirementAssignment({ node: topo_temp_node_name }, req[cst_req_name].source);
            const new_req_name = generateRequirementName(cst_node.requirements.concat(sub_requirements));
            sub_requirements.push({ [new_req_name]: requirement });
          });
        }
      }
    });
    if (sub_requirements.length > 0) {
      cst_node.requirements = cst_node.requirements.concat(sub_requirements);
    }
  });
  // capability_mapping
  cst.topology_template.substitution_mappings?.capabilities?.forEach((capa, capa_name) => {
    if (capa.mapping[0] === abstract_node.name) {
      const sub_capa = topo_temp.substitution_mappings.capabilities.get(capa.mapping[1]);
      sub_capa.setName(capa_name);
      cst.topology_template.substitution_mappings.capabilities.set(capa_name, sub_capa);
    }
  });
  // requirement_mapping
  cst.topology_template.substitution_mappings?.requirements?.forEach((req, req_name) => {
    if (req.mapping[0] === abstract_node.name) {
      const sub_req = topo_temp.substitution_mappings.requirements.get(req.mapping[1]);
      sub_req.setName(req_name);
      cst.topology_template.substitution_mappings.requirements.set(req_name, sub_req);
    }
  });
  // policy_def -> target_filter
  // Pb: what happens when a trigger_def doesn't have a target_filter but its event designate the attribute of the abstract node ?
  // there might be other similar cases where we name an attribute, capability, etc without mentioning the node
  cst.topology_template.policies?.forEach((policy) => {
    const policy_name = Object.keys(policy)[0];
    policy[policy_name].triggers?.forEach((trigger) => {
      const { target_filter } = trigger;
      if (target_filter?.node === abstract_node.name) {
        if (target_filter.requirement) {
          const sub_req = topo_temp.substitution_mappings.requirements.get(target_filter.requirement);
          target_filter.node = sub_req.mapping[0];
          target_filter.requirement = sub_req.mapping[1];
        } else if (target_filter.capability) {
          const sub_capa = topo_temp.substitution_mappings.capabilities.get(target_filter.capability);
          target_filter.node = sub_capa.mapping[0];
          target_filter.capability = sub_capa.mapping[1];
        } else {
          /**
           * Pb: abstract node that has the attribute monitored is substituted.
           * substitution_mapping.attributes allows to map outputs with attributes. So it doesn't link an attribute to another attribute.
           * Since it's an output, it's not in a node therefore how can I complete target_filter ?  Maybe we don't need target_filter
           * anymore since it's an output and it's at a higher level ?
           *
           * TO DO: find a solution
           */
          const sub_att = topo_temp.substitution_mappings.attributes.get(trigger.event);
          trigger_event = sub_att.mapping[0];
          target_filter.node = sub_att.mapping[0];
        }
      }
    });
  });
  // policy_type -> target_filter
  cst.policy_types?.forEach((policy) => {
    const policy_name = Object.keys(policy)[0];
    policy[policy_name].triggers?.forEach((trigger) => {
      const { target_filter } = trigger;
      if (target_filter?.node === abstract_node.name) {
        if (target_filter.requirement) {
          const sub_req = topo_temp.substitution_mappings.requirements.get(target_filter.requirement);
          target_filter.node = sub_req.mapping[0];
          target_filter.requirement = sub_req.mapping[1];
        } else if (target_filter.capability) {
          const sub_capa = topo_temp.substitution_mappings.capabilities.get(target_filter.capability);
          target_filter.node = sub_capa.mapping[0];
          target_filter.capability = sub_capa.mapping[1];
        } else {
          // same problem as in policy_def
          const sub_att = topo_temp.substitution_mappings.attributes.get(trigger.event);
          trigger_event = sub_att.mapping[0];
          target_filter.node = sub_att.mapping[0];
        }
      }
    });
  });
}

/**
 * Generate a unique short name for a requirement
 * @param {Array<{String: ToscaRequirementAssignment}>} requirements
 * @returns {string}
 */
function generateRequirementName(requirements) {
  // get all the names already used
  const req_names = [];
  requirements.forEach((o) => {
    req_names.push(Object.keys(o)[0]);
  });
  // generate a new one
  let n = 0;
  let req_name = `requirement_${n}`;
  while (req_names.includes(req_name)) {
    n++;
    req_name = `requirement_${n}`;
  }
  return req_name;
}
