import {
  describe, it, expect, beforeEach,
} from '@jest/globals';
import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { ToscaNodeType } from '#src/model/node_type.js';
import { Parser } from '#src/parser/parse.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { ignore_fields_and_circular_ref } from '#tests/unit/utils.js';
import nodeTypeDerivedFromJson from './node_type_derived_from.output.json';

describe('class ToscaNodeType', () => {
  beforeEach(() => {
    RuleParser.throwOnError = true;
  });

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
    const attributes = ['properties', 'attributes', 'capabilities', 'interfaces'];
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

      it('merges artifacts', () => {
        const parentInput = {
          artifacts: '1_artifacts__parent_test_value',
        };
        const parentType = new ToscaNodeType(parentInput, {});

        const childInput1 = {
          artifacts: '1_artifacts__child_test_value',
        };
        const childType1 = new ToscaNodeType(childInput1, {});

        childType1.inheritFrom(parentType);

        expect(childType1.artifacts).toEqual(childInput1.artifacts);

        const childInput2 = {
          artifacts: undefined,
        };
        const childType2 = new ToscaNodeType(childInput2, {});

        childType2.inheritFrom(parentType);

        expect(childType2.artifacts).toEqual(parentType.artifacts);
      });

      it('merges requirements', () => {
        const parentInput = {
          requirements: [1, 2],
        };
        const parentType = new ToscaNodeType(parentInput, {});

        const childInput = {
          requirements: [2, 3],
        };
        const childType = new ToscaNodeType(childInput, {});

        childType.inheritFrom(parentType);

        expect(childType.requirements).toEqual([1, 2, 2, 3]);
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

describe('Parser: node_type', () => {
  it('has expected output', () => {
    const parser = new Parser(new NodeJsFileManager());
    const result = parser.parse('tests/unit/types/node_type_derived_from.yml');
    // TODO: update this test when fully implemented.
    // console.log(JSON.stringify(ignore_fields_and_circular_ref(result)));
    expect(ignore_fields_and_circular_ref(result)).toEqual(nodeTypeDerivedFromJson);
  });
  it('parses a node_type correctly', () => {
    // TODO
  });

  it('inherits correctly (empty child)', () => {
    // TODO
  });

  it('inherits correctly (full child, redefining everything)', () => {
    // TODO
  });
});
