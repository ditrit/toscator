import { ToscaScalar } from './tosca_scalar.js';

/**
 *
 */
export class ToscaTime extends ToscaScalar {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(
      {
        type: input.type,
        value: input.value,
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
      d: 86400,
      h: 3600,
      m: 60,
      s: 1,
      ms: 0.001,
      ns: 0.000001,
      us: 0.000000001,
    }[unit] * value;
  }
}
