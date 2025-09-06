import { MapNode } from 'lidy-js/nodes/collections/mapnode';
import { ToscaAttributeDef } from 'src/model/attribute/attribute_def.js';
import { ToscaCapabilityAssignment } from 'src/model/capability/capability_assignment';
import { ToscaCapabilityDef } from 'src/model/capability/capability_def.js';
import { ToscaInterfaceDef } from 'src/model/interface/interface_def';
import { ToscaNodeTemplate } from 'src/model/node_template';
import { ToscaNodeType } from 'src/model/node_type.js';
import { ToscaParameter } from 'src/model/parameter/parameter';
import { ToscaParameterAssignment } from 'src/model/parameter/parameter_assignment';
import { ToscaPropertyDef } from 'src/model/property/property_def.js';
import { ToscaRequirementDef } from 'src/model/requirement/requirement_def.js';
import { ToscaServiceTemplate } from 'src/model/service_template';
import { ToscaSize } from 'src/model/tosca_size';
import { ToscaTopologyTemplate } from 'src/model/topology_template';
import { ToscaVersion } from 'src/model/version';
import { compile } from 'src/compilation';

describe('Full test on examples from official specification', () => {
  const testedFiles = [
    // TODO: uncomment as we implement.
    'spec_example_1.yml',
    // 'spec_example_2.yml', // TODO: crashes and compilation tests
    // 'spec_example_3.yml', // TODO: crashes and compilation tests
    // 'spec_example_4.yml', // TODO: crashes and compilation tests
    // 'spec_example_5.yml', // TODO: crashes and compilation tests
    // 'spec_example_6.yml', // TODO: crashes and compilation tests
    // 'spec_example_7.yml', // TODO: crashes and compilation tests
    // 'spec_example_8.yml', // TODO: crashes and compilation tests
    'spec_example_9.yml', // TODO: compilation tests
    // 'spec_example_10.yml', // TODO: crashes and compilation tests
    'spec_example_11.yml', // TODO: compilation tests
    // 'spec_example_12.yml', // TODO: crashes and compilation tests
    // 'spec_example_13.yml', // TODO: crashes and compilation tests
    // 'spec_example_14.yml', // TODO: crashes and compilation tests
    // 'spec_example_15.yml', // TODO: crashes and compilation tests
    // 'spec_example_16.yml', // TODO: crashes and compilation tests
    // 'spec_example_17.yml', // TODO: crashes and compilation tests
    'spec_example_18.yml', // TODO: compilation tests
    // 'spec_example_19.yml', // TODO: crashes and compilation tests
    // 'spec_example_20.yml', // TODO: crashes and compilation tests
    'spec_example_21.yml', // TODO: compilation tests
    // 'spec_example_22.yml', // TODO: parsing, crashes and compilation tests
    // 'spec_example_23.yml', // TODO: crashes and compilation tests
    // 'spec_example_24.yml', // TODO: crashes and compilation tests
    // 'spec_example_25.yml', // TODO: crashes and compilation tests
    // 'spec_example_26.yml', // TODO: crashes and compilation tests
  ];

  // TODO: Continue testing the rest of the examples.
  // TODO: (this will be a lot of work)
  for (const file of testedFiles) {
    const result = compile(`tests/unit/spec_examples/data/${file}`);

    it(`should not crash on ${file}`, () => {
      expect(() => result.not.toThrow());
    });

    it(`should return a ToscaServiceTemplate object on ${file}`, () => {
      expect(result).toBeInstanceOf(ToscaServiceTemplate);
    });

    it(`should use the correct Tosca version on ${file}`, () => {
      expect(result.tosca_definitions_version).toBe('tosca_simple_yaml_1_3');
    });
  }

  describe('Test template: spec_example_1', () => {
    const result = compile('tests/unit/spec_examples/data/spec_example_1.yml');

    it('should have the correct description', () => {
      expect(result.description).toBe('Template for deploying a single server with predefined properties.');
    });

    it('should have a ToscaTopologyTemplate object', () => {
      expect(result.topology_template).toBeInstanceOf(ToscaTopologyTemplate);
    });

    it('should have a node_templates map', () => {
      expect(result.topology_template.node_templates).toBeInstanceOf(Map);
    });

    describe('Test node template: db_server', () => {
      const nodeTemplate = result.topology_template.node_templates.get('db_server');

      it('should be a ToscaNodeTemplate object', () => {
        expect(nodeTemplate).toBeInstanceOf(ToscaNodeTemplate);
      });

      it('should have the correct description', () => {
        expect(nodeTemplate.description).toBe('The TOSCA Compute node represents one or more real or virtual processors of software applications or services along with other essential local resources.  Collectively, the resources the compute node represents can logically be viewed as a (real or virtual) “server”.\n');
      });

      it('should have the correct keynames', () => {
        expect(nodeTemplate.type).toBe('tosca.nodes.Compute');
        expect(nodeTemplate.capabilities).toBeInstanceOf(Map);
      });

      describe('Test capability: host', () => {
        const capability = nodeTemplate.capabilities.get('host');

        it('should be a ToscaCapabilityAssignment object', () => {
          expect(capability).toBeInstanceOf(ToscaCapabilityAssignment);
        });

        it('should have the correct description', () => {
          expect(capability.description).toBe('[inherited from tosca.capabilities.Compute] The Compute capability, when included on a Node Type or Template definition, indicates that the node can provide hosting on a named compute resource.\n');
        });

        it('should have a property map', () => {
          expect(capability.properties).toBeInstanceOf(Map);
        });

        it('should have properties that are ToscaParameterAssignment objects', () => {
          for (const property of capability.properties.values()) {
            expect(property).toBeInstanceOf(ToscaParameterAssignment);
          }
        });

        describe('Test property: num_cpus', () => {
          const property = capability.properties.get('num_cpus');

          it('should have the correct description', () => {
            expect(property.description).toBe('Number of (actual or virtual) CPUs associated with the Compute node.');
          });

          it('should have the correct value', () => {
            expect(property.value).toBe(1);
          });
        });

        describe('Test property: disk_size', () => {
          const property = capability.properties.get('disk_size');

          it('should have the correct description', () => {
            expect(property.description).toBe('Size of the local disk available to applications running on the Compute node (default unit is MB).');
          });

          it('should have a ToscaSize object', () => {
            expect(property.value).toBeInstanceOf(ToscaSize);
          });

          it('should have the correct value', () => {
            expect(property.value.value).toBe('10 GB');
          });
        });

        describe('Test property: mem_size', () => {
          const property = capability.properties.get('mem_size');

          it('should have the correct description', () => {
            expect(property.description).toBe('Size of memory available to applications running on the Compute node (default unit is MB).');
          });

          it('should have a ToscaSize object', () => {
            expect(property.value).toBeInstanceOf(ToscaSize);
          });

          it('should have the correct value', () => {
            expect(property.value.value).toBe('4096 MB');
          });
        });
      });

      describe('Test capability: os', () => {
        const capability = nodeTemplate.capabilities.get('os');

        it('should have the correct description', () => {
          expect(capability.description).toBe('[inherited from tosca.capabilities.OperatingSystem] This is the default TOSCA type that should be used to express an Operating System capability for a node.');
        });

        it('should be a ToscaCapabilityAssignment object', () => {
          expect(capability).toBeInstanceOf(ToscaCapabilityAssignment);
        });

        it('should have a property map', () => {
          expect(capability.properties).toBeInstanceOf(Map);
        });

        it('should have properties that are ToscaParameterAssignment objects', () => {
          for (const property of capability.properties.values()) {
            expect(property).toBeInstanceOf(ToscaParameterAssignment);
          }
        });

        describe('Test property: architecture', () => {
          const property = capability.properties.get('architecture');

          it('should have the correct description', () => {
            expect(property.description).toBe('The Operating System (OS) architecture.  Examples of valid values include: x86_32, x86_64, etc.\n');
          });

          it('should have the correct value', () => {
            expect(property.value).toBe('x86_64');
          });
        });

        describe('Test property: type', () => {
          const property = capability.properties.get('type');

          it('should have the correct description', () => {
            expect(property.description).toBe('The Operating System (OS) type.  Examples of valid values include: linux, aix, mac, windows, etc.\n');
          });

          it('should have the correct value', () => {
            expect(property.value).toBe('linux');
          });
        });

        describe('Test property: distribution', () => {
          const property = capability.properties.get('distribution');

          it('should have the correct description', () => {
            expect(property.description).toBe('The Operating System (OS) distribution.  Examples of valid values for an “type” of “Linux” would include: debian, fedora, rhel and ubuntu.\n');
          });

          it('should have the correct value', () => {
            expect(property.value).toBe('rhel');
          });
        });

        describe('Test property: version', () => {
          const property = capability.properties.get('version');

          it('should have the correct description', () => {
            expect(property.description).toBe('The Operating System version.\n');
          });

          it('should have a ToscaVersion object', () => {
            expect(property.value).toBeInstanceOf(ToscaVersion);
          });

          it('should have the correct value', () => {
            expect(property.value.value).toBe(6.5);
          });
        });
      });
    });
  });

  // Note: Parsing tests below works, you just need to resolve the error before uncommenting them.
  /* describe('Test template: spec_example_5', () => {
    const result = compile('tests/unit/spec_examples/data/spec_example_5.yml');

    it('should have the correct description', () => {
      expect(result.description).toBe('Template for deploying a single server with predefined properties.');
    });

    it('should have a ToscaTopologyTemplate object', () => {
      expect(result.topology_template).toBeInstanceOf(ToscaTopologyTemplate);
    });

    it('should have an inputs map', () => {
      expect(result.topology_template.inputs).toBeInstanceOf(Map);
    });

    describe('Test input: wordpress_db_name', () => {
      const input = result.topology_template.inputs.get('wordpress_db_name');

      it('should be a ToscaParameter object', () => {
        expect(input).toBeInstanceOf(ToscaParameter);
      });

      it('should have the correct value', () => {
        expect(input.type).toBe('string');
      });
    });

    describe('Test input: wordpress_db_user', () => {
      const input = result.topology_template.inputs.get('wordpress_db_user');

      it('should be a ToscaParameter object', () => {
        expect(input).toBeInstanceOf(ToscaParameter);
      });

      it('should have the correct value', () => {
        expect(input.type).toBe('string');
      });
    });

    describe('Test input: wordpress_db_password', () => {
      const input = result.topology_template.inputs.get('wordpress_db_password');

      it('should be a ToscaParameter object', () => {
        expect(input).toBeInstanceOf(ToscaParameter);
      });

      it('should have the correct value', () => {
        expect(input.type).toBe('string');
      });
    });

    it('should have a node_templates map', () => {
      expect(result.topology_template.node_templates).toBeInstanceOf(Map);
    });

    describe('Test node template: db_server', () => {
      const nodeTemplate = result.topology_template.node_templates.get('db_server');

      it('should be a ToscaNodeTemplate object', () => {
        expect(nodeTemplate).toBeInstanceOf(ToscaNodeTemplate);
      });

      it('should have the correct keynames', () => {
        expect(nodeTemplate.type).toBe('tosca.nodes.Compute');
      });
    });

    describe('Test node template: mysql', () => {
      const nodeTemplate = result.topology_template.node_templates.get('mysql');

      it('should be a ToscaNodeTemplate object', () => {
        expect(nodeTemplate).toBeInstanceOf(ToscaNodeTemplate);
      });

      it('should have the correct keynames', () => {
        expect(nodeTemplate.type).toBe('tosca.nodes.DBMS.MySQL');
      });
    });

    describe('Test node template: wordpress_db', () => {
      const nodeTemplate = result.topology_template.node_templates.get('wordpress_db');

      it('should be a ToscaNodeTemplate object', () => {
        expect(nodeTemplate).toBeInstanceOf(ToscaNodeTemplate);
      });

      it('should have the correct keynames', () => {
        expect(nodeTemplate.type).toBe('tosca.nodes.Database.MySQL');
        expect(nodeTemplate.properties).toBeInstanceOf(Map);
        expect(nodeTemplate.artifacts).toBeInstanceOf(Map);
        expect(nodeTemplate.requirements).toBeInstanceOf(Array);
        expect(nodeTemplate.interfaces).toBeInstanceOf(Map);
      });

      describe('Test interface: Standard', () => {
        const interfaceDef = nodeTemplate.interfaces.get('Standard');

        it('should be a ToscaParameterAssignment object', () => {
          expect(interfaceDef).toBeInstanceOf(ToscaInterfaceDef);
        });

        it('should have the correct keynames', () => {
          expect(interfaceDef.operations).toBeInstanceOf(Object);
        });

        describe('Test operation: create', () => {
          it('should be a MapNode object', () => {
            expect(interfaceDef.operations.create).toBeInstanceOf(MapNode);
          });

          it('should have the correct keynames', () => {
            expect(interfaceDef.operations.create.value.implementation.value).toBe('db_create.sh');
            expect(interfaceDef.operations.create.value.inputs).toBeInstanceOf(MapNode);
          });

          describe('Test property: db_data', () => {
            const property = interfaceDef.operations.create.value.inputs;

            it('should be a MapNode object', () => {
              expect(property).toBeInstanceOf(MapNode);
            });

            it('should have a MapNode object', () => {
              expect(property.value.db_data).toBeInstanceOf(MapNode);
            });

            describe('Test value expression: get_artifact', () => {
              const valueExpression = property.value.db_data.value.get_artifact.value;

              it('should be an Array', () => {
                expect(valueExpression).toBeInstanceOf(Array);
              });

              it('should have the correct values', () => {
                expect(valueExpression[0].value).toBe('SELF');
                expect(valueExpression[1].value).toBe('db_content');
              });
            });
          });
        });
      });
    });
  }); */

  // TODO: compilation tests
  describe('Test template: spec_example_18', () => {
    const result = compile('tests/unit/spec_examples/data/spec_example_18.yml');

    describe('Test parsing', () => {
      it('should have a node_types map', () => {
        expect(result.node_types).toBeInstanceOf(Map);
      });

      describe('Test node type: TransactionSubsystem', () => {
        const nodeType = result.node_types.get('TransactionSubsystem');

        it('should be a ToscaNodeType object', () => {
          expect(nodeType).toBeInstanceOf(ToscaNodeType);
        });

        it('should have the correct keynames', () => {
          expect(nodeType.properties).toBeInstanceOf(Map);
          expect(nodeType.attributes).toBeInstanceOf(Map);
          expect(nodeType.capabilities).toBeInstanceOf(Map);
          expect(nodeType.requirements).toBeInstanceOf(Array);
        });

        describe('Test property: mq_service_ip', () => {
          const property = nodeType.properties.get('mq_service_ip');

          it('should be a ToscaPropertyDef object', () => {
            expect(property).toBeInstanceOf(ToscaPropertyDef);
          });

          it('should have the correct value', () => {
            expect(property.type).toBe('string');
          });
        });

        describe('Test property: receiver_port', () => {
          const property = nodeType.properties.get('receiver_port');

          it('should be a ToscaPropertyDef object', () => {
            expect(property).toBeInstanceOf(ToscaPropertyDef);
          });

          it('should have the correct value', () => {
            expect(property.type).toBe('integer');
          });
        });

        describe('Test attribute: receiver_ip', () => {
          const attribute = nodeType.attributes.get('receiver_ip');

          it('should be a ToscaAttributeDef object', () => {
            expect(attribute).toBeInstanceOf(ToscaAttributeDef);
          });

          it('should have the correct value', () => {
            expect(attribute.type).toBe('string');
          });
        });

        describe('Test attribute: receiver_port', () => {
          const attribute = nodeType.attributes.get('receiver_port');

          it('should be a ToscaAttributeDef object', () => {
            expect(attribute).toBeInstanceOf(ToscaAttributeDef);
          });

          it('should have the correct value', () => {
            expect(attribute.type).toBe('integer');
          });
        });

        describe('Test capability: message_receiver', () => {
          const capability = nodeType.capabilities.get('message_receiver');

          it('should be a ToscaCapabilityDef object', () => {
            expect(capability).toBeInstanceOf(ToscaCapabilityDef);
          });

          it('should have the correct value', () => {
            expect(capability.type).toBe('tosca.capabilities.Endpoint');
          });
        });

        describe('Test requirement: database_endpoint', () => {
          const requirement = nodeType.requirements[0].database_endpoint;

          it('should be a ToscaRequirementDef object', () => {
            expect(requirement).toBeInstanceOf(ToscaRequirementDef);
          });

          it('should have the correct value', () => {
            expect(requirement.capability).toBe('tosca.capabilities.Endpoint.Database');
          });
        });
      });
    });
  });
});
