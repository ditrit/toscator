import { Charac } from './Charac.js';

/**
 *
 */
export class ToscaAttribute extends Charac {
  static _classname = 'attribute';

  /**
   *
   * @param input
   * @param source
   */
  static isValid(input, source) {
    let res = true;
    if (!super.isValid(input, source)) {
      res = false;
    }

    return res;
  }
}
