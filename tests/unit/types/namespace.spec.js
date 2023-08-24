import { it, describe, expect } from '@jest/globals';

import { Parser } from 'src/parser/parse.js';
import { ToscaNamespace } from 'src/model/namespace.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

describe('Tosca compiler ->', () => {
  const correct_namespace = 'tests/data/namespace/correct_namespace.yml';
  const incorrect_namespace = 'tests/data/namespace/incorrect_namespace.yml';
  const no_namespace = 'tests/data/namespace/no_namespace.yml';

  describe('Namespace: ', () => {
    it('Correct namespace', () => {
      const parser = new Parser(new NodeJsFileManager());
      expect(parser.parse(correct_namespace).namespace).toBeInstanceOf(ToscaNamespace);
    });

    /* it('incorrect namespace type', () => {
      expect(parse(incorrect_namespace).errors.length).toBeGreaterThanOrEqual(1);
    }); */

    it('no namespace', () => {
      const parser = new Parser(new NodeJsFileManager());
      expect(parser.parse(no_namespace).errors.length).toEqual(0);
    });
  });
});
