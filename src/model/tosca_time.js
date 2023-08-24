import { ToscaScalar } from './tosca_scalar.js';

export class ToscaTime extends ToscaScalar {
    constructor(input, source) {
        super(
            {
                type: input.type,
                value: input.value,
            },
            source
        );
    }
    static isValid(input, source) {
        //TODO: add regex for time
        /* creates a bug if source = null (which can happen in a _oneof for example)
         and is useless since lidy already does the regex check
      
      let regex =
         /([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?\s+[a-zA-Z]+/i;

      if (!regex.test(input.value.trim())) {
         source.ctx.grammarError(`Type time could not be created.`);

         return false;
      }*/
        if (source) {
            return true;
        }
        return false;
    }
    setNormalizedValue() {
        const value = this.value
            .trim()
            .match(/([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))? /i)[0];
        const unit = this.value.trim().match(/[a-zA-Z]+/i)[0];

        this.normalized_value =
         {
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

export function newToscaTime(input, source) {
    if (ToscaTime.isValid(input, source)) {
        return new ToscaTime(input, source);
    }
    return {};
}
