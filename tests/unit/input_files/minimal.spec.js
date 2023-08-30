import { it, describe, expect } from '@jest/globals';

import { Parser } from '#src/parser/parse.js';
import { ToscaProg } from '#src/model/prog.js';

describe('Tosca compiler ->', () => {
  const version_ok = ' tests/data/minimal_file/version_ok.yml';
  const empty_file = ' tests/data/minimal_file/empty_file.yml';
  const bad_path_file = ' tests/data/minimal_file/bad_path_file.yml';
  const bad_path_url = 'https://orness.com/minimal_file/bad_path_file.yml';
  const bad_version = ' tests/data/minimal_file/bad_version.yml';

  describe('Minimal source file: ', () => {
    it('(empty)', () => {});
    /* TODO: fix
    it('Minimal file compilation provides ToscaProg object', ()=>{
        expect(parse(bad_version)).toBeInstanceOf(ToscaProg); });

    it('bad path file raises an error', ()=>{
        expect(parse(bad_path_file).errors.length).toBeGreaterThanOrEqual(1);
    });

    it('bad path url raises an error', ()=>{
        const result = parse(bad_path_url);
        console.log(result);
        expect(result.errors.length).toBeGreaterThanOrEqual(1);
    });

    it('Empty file raises an error', ()=>{
        expect(parse(empty_file).errors.length).toBeGreaterThanOrEqual(1);
    });

    it('Minimal file compilation provides no errors', ()=>{
        expect(parse(version_ok).errors.length).toEqual(0);
    });

    it('Minimal file provides correct Tosca version', ()=>{
        expect(parse(version_ok).current_service_template?.tosca_definitions_version).toBe('tosca_simple_yaml_1_3');
    });

    it('Minimal file with bad version keyword', ()=>{
        expect(parse(bad_version).errors.length).toBeGreaterThanOrEqual(1);
    });

    // TODO : - Test URLs
    // - Handle different versions of Tosca
     */
  });
});
