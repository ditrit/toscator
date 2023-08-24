import {it, describe, expect} from '@jest/globals';

import { parse } from 'src/parser/parse.js';
import {ToscaNamespace} from 'src/model/namespace.js';

describe('Tosca compiler ->', ()=>{

    const correct_namespace = 'tests/data/namespace/correct_namespace.yml';
    const incorrect_namespace = 'tests/data/namespace/incorrect_namespace.yml';
    const no_namespace = 'tests/data/namespace/no_namespace.yml';

    describe('Namespace: ', ()=>{

        it('Correct namespace', ()=>{
            expect(parse(correct_namespace).namespace).toBeInstanceOf(ToscaNamespace);
        });

        /* TODO: fix
        it('incorrect namespace type', ()=>{
            expect(parse(incorrect_namespace).errors.length).toBeGreaterThanOrEqual(1);
        });
        */

        it('no namespace', ()=>{
            expect(parse(no_namespace).errors.length).toEqual(0);
        });
    });
});
