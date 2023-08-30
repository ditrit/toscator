import { describe, it, expect } from '@jest/globals';

import { compile } from '#src/compilation.js';

describe('Test function: compile', () => {
  const testedFiles = [
    'data_manual/ToscaExampleSimple.yml',
    'data_manual/ToscaExampleSimple2.yml',
    'data_manual/ToscaNextcloud.yml',
    // 'data_manual/ToscaExample.yml', // TODO: crashes

  ];

  for (const file of testedFiles) {
    it(`does not crash on ${file}`, () => {
      expect(() => compile(`tests/${file}`)).not.toThrow();
    });
  }
});
