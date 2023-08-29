import { ToscaScalar } from './tosca_scalar.js';

/**
 *
 */
export class ToscaBitrate extends ToscaScalar {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(
      {
        type: input.type,
        value: input.value, // unit of comparaison Mbps
      },
      source,
    );
  }

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    /* creates a bug when source == null which can happen (in a _oneOf for example)
      and is useless since lidy already does the regex check

      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+ (B|b)ps/i;
      if (!regex.test(input.value.trim())) {
         source.ctx.grammarError(`Type bitrate could not be created.`);

         return false;
      } */
    if (source) {
      return true;
    }
    return false;
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
      bps: 0.000001,
      Kbps: 0.001,
      Kibps: 0.001024,
      Mbps: 1,
      Mibps: 1.048576,
      Gbps: 1000,
      Gibps: 1073.741824,
      Tbps: 1000000,
      Tibps: 1099511.627776,
      Bps: 0.000008,
      KBps: 0.008,
      KiBps: 0.008192,
      MBps: 8,
      MiBps: 8.388608,
      GBps: 8000,
      GiBps: 8589.934592,
      TBps: 8000000,
      TiBps: 8796093.022208,
    }[unit] * value;
  }
}
