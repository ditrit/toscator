import {
  it, describe, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { Parser } from '#src/parser/parse.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';
import { ToscaServiceTemplate } from '#src/model/service_template.js';

describe('Tosca compiler ->', () => {
  let parser;
  beforeEach(() => {
    RuleParser.throwOnError = true;
    parser = new Parser(new NodeJsFileManager());
  });

  const version_ok = 'tests/unit/minimal_file/data/version_ok.yml';
  const empty_file = 'tests/unit/minimal_file/data/empty_file.yml';
  const bad_path_file = 'tests/unit/minimal_file/data/bad_path_file.yml';
  const bad_path_url = 'https://orness.com/minimal_file/bad_path_file.yml';
  const bad_version = 'tests/unit/minimal_file/data/bad_version.yml';

  describe('Minimal source file: ', () => {
    it('Minimal file compilation provides ToscaServiceTemplate object', () => {
      expect(parser.parse(version_ok)).toBeInstanceOf(ToscaServiceTemplate);
    });

    it('bad path file raises an error', () => {
      expect(() => parser.parse(bad_path_file))
        .toThrow(/ENOENT: no such file or directory/);
    });

    it('Empty file raises an error', () => {
      expect(() => parser.parse(empty_file))
        .toThrow('empty src_data');
    });

    it('Minimal file provides correct Tosca version', () => {
      expect(parser.parse(version_ok).tosca_definitions_version)
        .toBe('tosca_simple_yaml_1_3');
    });

    it('Minimal file with bad version keyword', () => {
      expect(() => parser.parse(bad_version))
        .toThrow(/SyntaxError : Error : key 'tosca_definitions_version' not found in current value at line 1, column 1/);
    });

    // TODO: Implement this test once URL fetching is implemented.
    /*
    it('bad path url raises an error', ()=>{
        const result = parse(bad_path_url);
        console.log(result);
        expect(result.errors.length).toBeGreaterThanOrEqual(1);
    });
    */
  });
});
