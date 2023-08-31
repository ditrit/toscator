import {
  it, describe, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { Parser } from '#src/parser/parse.js';
import { ToscaImport } from '#src/model/imports.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

// TODO: réparer ces tests
describe('Tosca compiler ->', () => {
  let parser;
  beforeEach(() => {
    RuleParser.throwOnError = true;
    parser = new Parser(new NodeJsFileManager());
  });

  const correct_simple_import = 'tests/unit/import/data/correct_simple_import.yml';
  const incorrect_simple_import = 'tests/unit/import/data/incorrect_simple_import_incorrect_child.yml';
  const correct_full_import = 'tests/unit/import/data/correct_full_import.yml';
  const incorect_full_import_no_file = 'tests/unit/import/data/incorect_full_import_no_file.yml';
  const incorrect_full_import_incorrect_repository = 'tests/unit/import/data/correct_full_import.yml';
  const incorrect_full_import_incorrect_namespace_prefix = 'tests/unit/import/data/incorrect_full_import_incorrect_namespace_prefix.yml';
  const incorrect_full_import_incorrect_namespace_uri = 'tests/unit/import/data/incorrect_full_import_incorrect_namespace_uri.yml';

  describe('Import tosca object: ', () => {
    it('Correct simple import', () => {
      const result = parser.parse(correct_simple_import);
      expect(result.imports[0]).toBeInstanceOf(ToscaImport);
      expect(result.imports[0].file).toEqual('./import_child_test.yml');
    });

    it('incorrect simple import type', () => {
      expect(() => parser.parse(incorrect_simple_import))
        .toThrow(/key 'tosca_definitions_version' not found in current value at line 2, column 1/);
    });

    // ######### TODO REPOSITORIES ##########
    it('correct full import', () => {
      expect(parser.parse(correct_full_import).errors.length).toEqual(0);
    });

    it('incorrect full import - no file', () => {
      expect(() => parser.parse(incorect_full_import_no_file))
        .toThrow(/ENOENT: no such file or directory/);
    });

    // ######### TODO REPOSITORIES ##########
    it('incorrect full import - incorrect repository', () => {
      expect(parser.parse(incorrect_full_import_incorrect_repository).errors.length).toEqual(0);
    });

    it('incorrect full import - incorrect namespace_prefix', () => {
      expect(() => parser.parse(incorrect_full_import_incorrect_namespace_prefix))
        .toThrow(/Error : bad value '\{"ns":"test"}'found for 'namespace_prefix' \(mapparser\.parse\) at line 5, column 23/);
    });

    it('incorrect full import - incorrect namespace_uri', () => {
      expect(() => parser.parse(incorrect_full_import_incorrect_namespace_uri))
        .toThrow(/Error : bad value '\{"ns":"test"}'found for 'namespace_uri' \(mapparser\.parse\) at line 6, column 20/);
    });
  });

  const loop_import_file = 'tests/unit/import/data/loop_import_test.yml';

  describe('Import files : ', () => {
    it('incorrect import simple file', () => {
      expect(() => parser.parse(incorrect_simple_import))
        .toThrow(/Error : key 'tosca_definitions_version' not found in current value at line 2, column 1/);
    });

    it('loop import file', () => {
      expect(parser.parse(loop_import_file).imports.length)
        .toEqual(1);
    });
  });

  const correct_import_url = 'tests/unit/import/data/url/correct_simple_import.yml';
  const correct_interlock_import_url = 'tests/unit/import/data/url/correct_interlock_import.yml';
  describe('Imports urls : ', () => {

    // TODO: Enable/implement these tests once fetching remote resources is possible.
    /* it("Correct import simple url", ()=>{
            expect(parser.parse(correct_import_url).imports.length).toEqual(1);
        });
        */

    /* it("Correct interlock url import", ()=>{
            expect(parse(correct_interlock_import_url).service_templates.length).toEqual(3);
        }); */
  });
});
