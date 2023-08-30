import {
  it, describe, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { Parser } from '#src/parser/parse.js';
import { ToscaImport } from '#src/model/imports.js';
import { NodeJsFileManager } from '#src/parser/FileManager.js';

// TODO: réparer ces tests
describe('Tosca compiler ->', () => {
  beforeEach(() => {
    RuleParser.throwOnError = true;
  });

  const correct_simple_import = 'tests/data/import/correct_simple_import.yml';
  const incorrect_simple_import = 'tests/data/import/incorrect_simple_import_incorrect_child.yml';
  const correct_full_import = 'tests/data/import/correct_full_import.yml';
  const incorect_full_import_no_file = 'tests/data/import/incorect_full_import_no_file.yml';
  const incorrect_full_import_incorrect_repository = 'tests/data/import/correct_full_import.yml';
  const incorrect_full_import_incorrect_namespace_prefix = 'tests/data/import/incorrect_full_import_incorrect_namespace_prefix.yml';
  const incorrect_full_import_incorrect_namespace_uri = 'tests/data/import/incorrect_full_import_incorrect_namespace_uri.yml';

  describe('Import tosca object: ', () => {
    it('Correct simple import', () => {
      const parser = new Parser(new NodeJsFileManager());
      const result = parser.parse(correct_simple_import);
      expect(result.imports[0]).toBeInstanceOf(ToscaImport);
      expect(result.imports[0].file).toEqual('./import_child_test.yml');
    });

    /*
        it("incorrect simple import type",()=>{
            expect(parse(incorrect_simple_import).errors.length).not.toBeInstanceOf(ToscaImport);
        });
        */

    // ######### TODO REPOSITORIES ##########
    it(
      'correct full import',
      () => {
        const parser = new Parser(new NodeJsFileManager());
        expect(parser.parse(correct_full_import).errors.length).toEqual(0);
      },
    );

    /* it("incorrect full import - no file", ()=>{
            //expect(parse(incorect_full_import_no_file).errors[0].name).toEqual("File error");
            expect(parse(incorect_full_import_no_file).errors[0].name).toEqual("File error");
        }); */

    // ######### TODO REPOSITORIES ##########
    // it("incorrect full import - incorrect repository",
    // ()=>{
    // expect(parse(incorrect_full_import_incorrect_repository).errors.length).toEqual(0)
    // });

    // Utilité pour Toscator ?
    /* it("incorrect full import - incorrect namespace_prefix", ()=>{
            expect(parse(incorrect_full_import_incorrect_namespace_prefix).errors.length).toBeGreaterThanOrEqual(1);
        });

        it("incorrect full import - incorrect namespace_uri", ()=>{
            expect(parse(incorrect_full_import_incorrect_namespace_uri).errors.length).toBeGreaterThanOrEqual(1);
        }); */
  });


  const loop_import_file = 'tests/data/import/loop_import_test.yml';

  describe('Import files : ', () => {
    it('Correct import simple file', () => {
      const parser = new Parser(new NodeJsFileManager());
      /* const result = */ parser.parse(correct_simple_import);
      // console.log(result);
      // TODO: there is always only one service template. So what was being tested here?
      // expect(result.service_templates.length).toBeGreaterThanOrEqual(1);
    });

    /*it('incorrect import simple file', () => {
      const parser = new Parser(new NodeJsFileManager());
      expect(parser.parse(incorrect_simple_import).errors.length).toBeGreaterThanOrEqual(1);
    });*/

    /*
        it("loop import file", ()=>{
            expect(parse(loop_import_file).service_templates.length).toEqual(2);
        }); */
  });

  const correct_import_url = 'tests/data/import/url/correct_simple_import.yml';
  const correct_interlock_import_url = 'tests/data/import/url/correct_interlock_import.yml';
  describe('Imports urls : ', () => {

    /* it("Correct import simple url", ()=>{
            expect(parse(correct_import_url).service_templates.length).toEqual(2);
        });

        it("Correct interlock url import", ()=>{
            expect(parse(correct_interlock_import_url).service_templates.length).toEqual(3);
        }); */
  });
});