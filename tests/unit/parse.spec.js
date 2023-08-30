import {describe, it, expect} from '@jest/globals';

import {parse} from 'src/parser/parse.js';
import parserJson from './parse.json';

describe('Parsing', ()=>{
    it('gives a reproducible output',()=>{
        // provide the relative path to the tosca file to parse
        const res = parse('tests/data_manual/test_parsing/testInterfaceMapping.yml');

        const seen = new Set();
        function replacer(key,value)
        {
            if(key==='origin_file')
                return '__IGNORED__'; // ignore

            // ignore circular references
            if(seen.has(value))
                return;
            seen.add(value);

            return value;
        }
        expect(JSON.parse(JSON.stringify(res, replacer))).toEqual(parserJson);
    });
});
