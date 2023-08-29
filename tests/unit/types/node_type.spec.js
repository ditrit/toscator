import { describe } from '@jest/globals';
import { ToscaNodeType } from '#src/model/node_type.js';

describe('class ToscaNodeType', () => {
  describe('Constructor', () => {
    it('defines attributes correctly', () => {
      const input = {
        derived_from: 'derived_from__test_value',
        version: 'version__test_value',
        description: 'description__test_value',
        metadata: 'metadata__test_value',
        properties: 'properties__test_value',
        attributes: 'attributes__test_value',
        capabilities: 'capabilities__test_value',
        requirements: 'requirements__test_value',
        artifacts: 'artifacts__test_value',
        interfaces: 'interfaces__test_value',
      };
      const source = {
        attribute: 'source__test_value',
        tosca: undefined,
      };

      const nodeType = new ToscaNodeType(input, source);

      // Defined in ToscaNodeType
      expect(nodeType.properties).toBe(input.properties);
      expect(nodeType.attributes).toBe(input.attributes);
      expect(nodeType.capabilities).toBe(input.capabilities);
      expect(nodeType.requirements).toBe(input.requirements);
      expect(nodeType.artifacts).toBe(input.artifacts);
      expect(nodeType.interfaces).toBe(input.interfaces);

      // Defined in ToscaType
      expect(nodeType.derived_from).toBe(input.derived_from);
      expect(nodeType.version).toBe(input.version);
      expect(nodeType.metadata).toBe(input.metadata);
      expect(nodeType.description).toBe(input.description);

      // Defined in ToscaNode
      expect(nodeType.source.attribute).toBe(source.attribute);
    });
  });

  describe('Test method: inheritFrom', () => {
    it('merges properties', () => {
      const parentInput = {
        properties: {
          a: 'parent_value_a',
          b: 'parent_value_b',
        },
      };
      const parentType = new ToscaNodeType(parentInput, {});

      const childInput = {
        properties: {
          b: 'child_value_b',
          c: 'child_value_c',
        },
      };
      const childType = new ToscaNodeType(childInput, {});

      childType.inheritFrom(parentType);

      expect(childType.properties).toEqual({
        ...parentType.properties,
        ...childType.properties,
      });
    });
  });
});
