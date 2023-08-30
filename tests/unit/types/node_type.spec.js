import {
  describe, it, expect, beforeEach,
} from '@jest/globals';
import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { ToscaNodeType } from '#src/model/node_type.js';
import { compile } from '#src/compilation.js';
import { ToscaProperty } from '#src/model/property.js';

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
          [attributeName]: new Map([
            ['a', 'parent_value_a'],
            ['b', 'parent_value_b'], // Will be overwritten by child value.
          ]),
        };
        const parentType = new ToscaNodeType(parentInput, {});

        const childInput = {
          [attributeName]: new Map([
            ['b', 'child_value_b'], // Will overwrite parent value.
            ['c', 'child_value_c'],
          ]),
        };
        const childType = new ToscaNodeType(childInput, {});

        childType.inheritFrom(parentType);

        expect(childType[attributeName]).toEqual(new Map([
          ['a', 'parent_value_a'],
          ['b', 'child_value_b'],
          ['c', 'child_value_c'],
        ]));
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

        const childInput1 = {
          requirements: [2, 3], // Will not inherit.
        };
        const childType1 = new ToscaNodeType(childInput1, {});

        childType1.inheritFrom(parentType);

        expect(childType1.requirements).toEqual([2, 3]);

        const childInput2 = {
          requirements: undefined, // Will inherit.
        };
        const childType2 = new ToscaNodeType(childInput2, {});

        childType2.inheritFrom(parentType);

        expect(childType2.requirements).toEqual([1, 2]);
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
  beforeEach(() => {
    RuleParser.throwOnError = true;
  });

  it('parses a node_type correctly', () => {
    const result = compile('tests/unit/types/node_type_derived_from.yml');

    const test_parent_type = result.node_types.get('test_parent_type');
    expect(test_parent_type).toBeInstanceOf(ToscaNodeType);

    expect(test_parent_type.properties.size).toBe(2);

    const test_property_1 = test_parent_type.properties.get('test_property_1');
    expect(test_property_1).toBeInstanceOf(ToscaProperty);
    expect(test_property_1.type).toBe('fake_type_11');
    expect(test_property_1.default).toBe(11);

    const test_property_2 = test_parent_type.properties.get('test_property_2');
    expect(test_property_2).toBeInstanceOf(ToscaProperty);
    expect(test_property_2.type).toBe('fake_type_12');
    expect(test_property_2.default).toBe(12);

    // TODO: Check other attributes. (only properties are checked as of now)
  });

  it('inherits correctly (empty child)', () => {
    const result = compile('tests/unit/types/node_type_derived_from.yml');

    const test_empty_child_type = result.node_types.get('test_empty_child_type');
    expect(test_empty_child_type).toBeInstanceOf(ToscaNodeType);
    expect(test_empty_child_type.properties.size).toBe(2);

    const test_property_1 = test_empty_child_type.properties.get('test_property_1');
    expect(test_property_1).toBeInstanceOf(ToscaProperty);
    expect(test_property_1.type).toBe('fake_type_11');
    expect(test_property_1.default).toBe(11);

    const test_property_2 = test_empty_child_type.properties.get('test_property_2');
    expect(test_property_2).toBeInstanceOf(ToscaProperty);
    expect(test_property_2.type).toBe('fake_type_12');
    expect(test_property_2.default).toBe(12);
  });

  it('inherits correctly (full child, redefining everything)', () => {
    const result = compile('tests/unit/types/node_type_derived_from.yml');

    const test_full_child_type = result.node_types.get('test_full_child_type');
    expect(test_full_child_type).toBeInstanceOf(ToscaNodeType);
    expect(test_full_child_type.properties.size).toBe(3);

    const test_property_1 = test_full_child_type.properties.get('test_property_1');
    expect(test_property_1).toBeInstanceOf(ToscaProperty);
    expect(test_property_1.type).toBe('fake_type_11');
    expect(test_property_1.default).toBe(11);

    const test_property_2 = test_full_child_type.properties.get('test_property_2');
    expect(test_property_2).toBeInstanceOf(ToscaProperty);
    expect(test_property_2.type).toBe('fake_type_22');
    expect(test_property_2.default).toBe(22);

    const test_property_3 = test_full_child_type.properties.get('test_property_3');
    expect(test_property_3).toBeInstanceOf(ToscaProperty);
    expect(test_property_3.type).toBe('fake_type_23');
    expect(test_property_3.default).toBe(23);
  });
});
