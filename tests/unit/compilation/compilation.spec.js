import {
  describe, it, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';

describe('Test function: compile', () => {
  beforeEach(() => {
    RuleParser.throwOnError = true;
  });

  const testedFiles = [
    'data_manual/ToscaExampleSimple.yml',
    'data_manual/ToscaExampleSimple2.yml',
    // 'data_manual/ToscaNextcloud.yml', // TODO: crashes
    // 'data_manual/ToscaExample.yml', // TODO: crashes

  ];

  for (const file of testedFiles) {
    it(`does not crash on ${file}`, () => {
      expect(() => compile(`tests/${file}`)).not.toThrow();
    });
  }
});
