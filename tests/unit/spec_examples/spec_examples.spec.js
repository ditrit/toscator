import {
  describe, it, expect, beforeEach,
} from '@jest/globals';

import { RuleParser } from 'lidy-js/parser/ruleparser.js';
import { compile } from '#src/compilation.js';

describe('Full test on examples from official specification', () => {
  beforeEach(() => {
    RuleParser.throwOnError = true;
  });

  const testedFiles = [
    // TODO: comment examples that are not meant to be parsable as is.
    'spec_example_1.yml',
    'spec_example_2.yml',
    'spec_example_3.yml',
    'spec_example_4.yml',
    'spec_example_5.yml',
    'spec_example_6.yml',
    'spec_example_7.yml',
    'spec_example_8.yml',
    'spec_example_9.yml',
    'spec_example_10.yml',
    'spec_example_11.yml',
    'spec_example_12.yml',
    'spec_example_13.yml',
    'spec_example_14.yml',
    'spec_example_15.yml',
    'spec_example_16.yml',
    'spec_example_17.yml',
    'spec_example_18.yml',
    'spec_example_19.yml',
    'spec_example_20.yml',
    'spec_example_21.yml',
    'spec_example_22.yml',
    'spec_example_23.yml',
    'spec_example_24.yml',
    'spec_example_25.yml',
    'spec_example_26.yml'];

  // TODO: Do not just check whether it crashes but compare with expected output.
  for (const file of testedFiles) {
    it(`does not crash on ${file}`, () => {
      expect(() => compile(`tests/unit/spec_examples/data/${file}`)).not.toThrow();
    });
  }
});
