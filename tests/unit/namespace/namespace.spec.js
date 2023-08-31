import {
  it, describe, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { Parser } from '#src/parser/parse.js';
import { ToscaNamespace } from '#src/model/namespace.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

describe('Tosca compiler ->', () => {
  let parser;
  beforeEach(() => {
    RuleParser.throwOnError = true;
    parser = new Parser(new NodeJsFileManager());
  });

  const correct_namespace = 'tests/unit/namespace/data/correct_namespace.yml';
  const incorrect_namespace = 'tests/unit/namespace/data/incorrect_namespace.yml';
  const no_namespace = 'tests/unit/namespace/data/no_namespace.yml';

  describe('Namespace: ', () => {
    it('Correct namespace', () => {
      expect(parser.parse(correct_namespace).namespace)
        .toBeInstanceOf(ToscaNamespace);
    });

    it('incorrect namespace type', () => {
      expect(() => parser.parse(incorrect_namespace))
        .toThrow(/SyntaxError : Error: value 'undefined' is not a string at line 3, column 12/);
    });

    it('no namespace', () => {
      expect(parser.parse(no_namespace).errors.length)
        .toEqual(0);
    });
  });
});
