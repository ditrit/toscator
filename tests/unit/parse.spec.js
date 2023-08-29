import { describe, it, expect } from '@jest/globals';

import { Parser } from 'src/parser/parse.js';
import parserJson from './parse.json';
import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { ignore_fields_and_circular_ref } from './utils.js';

describe('Parsing', () => {
  it('gives a reproducible output', () => {
    const parser = new Parser(new NodeJsFileManager());
    // provide the relative path to the tosca file to parse
    const res = parser.parse('tests/data_manual/test_parsing/testInterfaceMapping.yml');

    expect(ignore_fields_and_circular_ref(res)).toEqual(parserJson);
  });
});
