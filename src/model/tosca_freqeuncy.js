import { ToscaScalar } from './tosca_scalar.js';

/**
 *
 */
export class ToscaFrequency extends ToscaScalar {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(
      {
        type: input.type,
        value: input.value, // unit of comparaison kHz
      },
      source,
    );
  }

  /**
   *
   */
  setNormalizedValue() {
    const value = this.value
      .trim()
      .match(/([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))? /i)[0];
    const unit = this.value.trim().match(/[a-zA-Z]+/i)[0];

    this.normalized_value = {
      Hz: 0.001,
      kHz: 1,
      MHz: 1000,
      GHz: 1000000,
    }[unit] * Number(value);
  }
}
