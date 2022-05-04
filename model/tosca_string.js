import { ToscaValue } from "./tosca_value";
import Ajv from "ajv";
import Regex from "regex";
var ajv = new Ajv();

export class ToscaString extends ToscaValue {
   constructor(input, source) {
      super(source);
      this.type = input.type;
      this.value = input.value;
   }
   equals(value) {
      return this.value == value;
   }
   greater_than(value) {
      return this.value > value;
   }
   greater_than_or_equal(value) {
      return this.value >= value;
   }
   less_than(value) {
      return this.value < value;
   }
   less_than_or_equal(value) {
      return this.value <= value;
   }
   in_range(value) {
      return this.value >= value[0] && this.value <= value[1];
   }
   valid_values(value) {
      return value.includes(this.value);
   }
   schema(value) {
      const validate = ajv.compile(this.value);
      return validate(value);
   }
   pattern(value) {
      let regex = new Regex(this.value);
      return regex.test(value);
   }
}
