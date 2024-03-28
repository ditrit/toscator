import { ToscaServiceTemplate } from 'src/model/service_template';
import { ToscaTopologyTemplate } from 'src/model/topology_template';
import { ToscaNodeTemplate } from 'src/model/node_template';
import { ToscaCapabilityAssignment } from 'src/model/capability/capability_assignment';
import { ToscaParameterAssignment } from 'src/model/parameter/parameter_assignment';
import { ToscaSize } from 'src/model/tosca_size';
import { ToscaVersion } from 'src/model/version';
import { ToscaParameter } from 'src/model/parameter/parameter';
import { ToscaInterfaceDef } from 'src/model/interface/interface_def';
import { MapNode } from 'lidy-js/nodes/collections/mapnode';
import { compile } from '#src/compilation';

describe('Full test on examples from official specification', () => {
  const testedFiles = [
    // TODO: uncomment as we implement.
    'spec_example_1.yml',
    'spec_example_2.yml',
    'spec_example_3.yml',
    'spec_example_4.yml',
    'spec_example_5.yml',
    'spec_example_6.yml',
    'spec_example_7.yml',
    'spec_example_8.yml',
    'spec_example_9.yml',
    'spec_example_10.yml',
    'spec_example_11.yml',
    'spec_example_12.yml',
    'spec_example_13.yml',
    'spec_example_14.yml',
    'spec_example_15.yml',
    'spec_example_16.yml',
    'spec_example_17.yml',
    'spec_example_18.yml',
    'spec_example_19.yml',
    'spec_example_20.yml',
    'spec_example_21.yml',
    // 'spec_example_22.yml',
    // 'spec_example_23.yml',
    'spec_example_24.yml',
    'spec_example_25.yml',
    'spec_example_26.yml',
  ];

  // TODO: Do not just check whether it crashes but compare with expected output.
  // TODO: (this will be a lot of work)
  // NOTE: spec_example_1 and spec_example_5 are already implemented.
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

      it('should have the correct keynames', () => {
        expect(nodeTemplate.type).toBe('tosca.nodes.Compute');
        expect(nodeTemplate.capabilities).toBeInstanceOf(Map);
      });

      describe('Test capability: host', () => {
        const capability = nodeTemplate.capabilities.get('host');

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

        describe('Test property: num_cpus', () => {
          const property = capability.properties.get('num_cpus');

          it('should have the correct value', () => {
            expect(property.value).toBe(1);
          });
        });

        describe('Test property: disk_size', () => {
          const property = capability.properties.get('disk_size');

          it('should have a ToscaSize object', () => {
            expect(property.value).toBeInstanceOf(ToscaSize);
          });

          it('should have the correct value', () => {
            expect(property.value.value).toBe('10 GB');
          });
        });

        describe('Test property: mem_size', () => {
          const property = capability.properties.get('mem_size');

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

          it('should have the correct value', () => {
            expect(property.value).toBe('x86_64');
          });
        });

        describe('Test property: type', () => {
          const property = capability.properties.get('type');

          it('should have the correct value', () => {
            expect(property.value).toBe('linux');
          });
        });

        describe('Test property: distribution', () => {
          const property = capability.properties.get('distribution');

          it('should have the correct value', () => {
            expect(property.value).toBe('rhel');
          });
        });

        describe('Test property: version', () => {
          const property = capability.properties.get('version');

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

  describe('Test template: spec_example_5', () => {
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

          describe('Test attribute: db_data', () => {
            const attribute = interfaceDef.operations.create.value.inputs;

            it('should be a MapNode object', () => {
              expect(attribute).toBeInstanceOf(MapNode);
            });

            it('should have a MapNode object', () => {
              expect(attribute.value.db_data).toBeInstanceOf(MapNode);
            });

            describe('Test value expression: get_artifact', () => {
              const valueExpression = attribute.value.db_data.value.get_artifact.value;

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
  });
});
