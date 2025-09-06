import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';
import { describe, expect } from '@jest/globals';

describe('Test function: compile', () => {
/*   beforeEach(() => {
    RuleParser.throwOnError = true;
  }); */

  const testedFiles = [
    'data_manual/ToscaExampleSimple.yml',
    'data_manual/ToscaExampleSimple2.yml',
    // 'data_manual/ToscaNextcloud.yml', // TODO: crashes
    // 'data_manual/ToscaExample.yml', // TODO: crashes
  ];

  describe('Test types', () => {
    it('should throw an error if a type is not resolvable', () => {
      expect(() => compile('tests/unit/compilation/data/type/unknown_node_type.yml'))
        .toThrow("Unknown type: 'SoftwareComponen' type not found in 'ServerNode'.");
    });

    it('should throw an error if a type is not instanciable', () => {
      expect(() => compile('tests/unit/compilation/data/type/unknown_template_type.yml'))
        .toThrow("Unknown type: 'ServerNod' type not found in 'my_server'.");
    });

    it('should throw an error when assigning a value with invalid type', () => {
      expect(() => compile('tests/unit/compilation/data/type/invalid_type.yml'))
        .toThrow("Invalid type for property assign: 'port' must be a integer.");
    });
  });

  describe('Test constraints', () => {
    it('should throw an error if a constraint cannot be applied to a type', () => {
      expect(() => compile('tests/unit/compilation/data/constraint/invalid_constraint_application.yml'))
        .toThrow("Invalid constraint application: 'length' constraint cannot be applied to type 'integer'.");
    });

    it('should throw an error if a constraint is not fulfilled', () => {
      expect(() => compile('tests/unit/compilation/data/constraint/unfulfilled_constraint.yml'))
        .toThrow("Unfulfilled constraint: 'notification_port' must be greater than or equal to '1024'.");
    });
  });

  describe('Test entry schemas', () => {
    it('should throw an error if entry schema is used incorrectly', () => {
      expect(() => compile('tests/unit/compilation/data/entry_schema/invalid_entry_schema_usage.yml'))
        .toThrow("Invalid use of entry_schema: entry_schema is only allowed for types 'list' or 'map', but found type 'integer'.");
    });

    it('should throw an error if entry schema is not fulfilled', () => {
      expect(() => compile('tests/unit/compilation/data/entry_schema/unfulfilled_entry_schema.yml'))
        .toThrow("Invalid type for list item: 'port' is of type 'string' but expected 'integer' as defined in entry_schema.");
    });
  });

  it('should throw an error if a required field is missing', () => {
    expect(() => compile('tests/unit/compilation/data/missing_required_field.yml'))
      .toThrow("Required field missing: 'notification_port' is required in 'my_server'.");
  });

  describe('Test template: spec_example_1', () => {
    const result = compile('tests/unit/spec_examples/data/spec_example_1.yml');

    describe('Test node template: db_server', () => {
      const nodeTemplate = result.topology_template.node_templates.get('db_server');

      it('should have the correct description', () => {
        expect(nodeTemplate.description).toBe('The TOSCA Compute node represents one or more real or virtual processors of software applications or services along with other essential local resources.  Collectively, the resources the compute node represents can logically be viewed as a (real or virtual) “server”.\n');
      });

      // TODO: implement tests for 'os' capability.
      describe('Test capability: host', () => {
        const capability = nodeTemplate.capabilities.get('host');

        // TODO: implement tests for other properties.
        describe('Test property: num_cpus', () => {
          const property = capability.properties.get('num_cpus');

          it('should have the correct description', () => {
            expect(property.description).toBe('Number of (actual or virtual) CPUs associated with the Compute node.');
          });
        });
      });
    });
  });
});
