import { describe, it, expect } from '@jest/globals';

import { Parser } from 'src/parser/parse.js';
import parserJson from './parse.json';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

describe('Parsing', () => {
  it('gives a reproducible output', () => {
    const parser = new Parser(new NodeJsFileManager());
    // provide the relative path to the tosca file to parse
    const res = parser.parse('tests/data_manual/test_parsing/testInterfaceMapping.yml');

    const seen = new Set();

    const replacer = (key, value) => {
      if (['origin_file', 'file'].includes(key)) return '__IGNORED__'; // ignore

      // ignore circular references
      if (seen.has(value)) return undefined;
      seen.add(value);

      return value;
    };
    expect(JSON.parse(JSON.stringify(res, replacer))).toEqual(parserJson);
  });
});
