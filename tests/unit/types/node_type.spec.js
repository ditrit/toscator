import { describe, it, expect } from '@jest/globals';
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
    const attributes = ['properties', 'attributes', 'capabilities', 'requirements', 'artifacts', 'interfaces'];
    for (const attributeName of attributes) {
      it(`merges ${attributeName}`, () => {
        const parentInput = {
          [attributeName]: {
            a: 'parent_value_a',
            b: 'parent_value_b',
          },
        };
        const parentType = new ToscaNodeType(parentInput, {});

        const childInput = {
          [attributeName]: {
            b: 'child_value_b',
            c: 'child_value_c',
          },
        };
        const childType = new ToscaNodeType(childInput, {});

        childType.inheritFrom(parentType);

        expect(childType[attributeName]).toEqual({
          ...parentType[attributeName],
          ...childType[attributeName],
        });
      });

      it('inherits scalar attributes when undefined', () => {
        const parentInput = {
          name: 'parent__name',
          version: 'parent__version',
          metadata: 'parent__metadata',
          description: 'parent__description',
        };
        const parentType = new ToscaNodeType(parentInput, {});

        const childInput = {
        };
        const childType = new ToscaNodeType(childInput, {});

        childType.inheritFrom(parentType);

        expect(childType.version).toEqual(parentInput.version);
        expect(childType.metadata).toEqual(parentInput.metadata);
        expect(childType.description.includes(parentInput.description)).toBeTruthy();
        expect(childType.description.includes('inherited from')).toBeTruthy();
      });
    }
  });
});
