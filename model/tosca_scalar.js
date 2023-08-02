import { ToscaValue } from "./tosca_value.js";

export class ToscaScalar extends ToscaValue {
   constructor(input, source) {
      super(input, source);
      this.type = input.type;
      this.value = input.value;
      this.setNormalizedValue(input.value);
   }
   equals(value) {
      return this.normalized_value == value.normalized_value;
   }
   greater_than(value) {
      return this.normalized_value < value.normalized_value;
   }
   greater_than_or_equal(value) {
      return this.normalized_value <= value.normalized_value;
   }
   less_than(value) {
      return this.normalized_value > value.normalized_value;
   }
   less_than_or_equal(value) {
      return this.normalized_value >= value.normalized_value;
   }
   // this one is reversed: value is the range of valid values
   in_range(value) {
      return (
         value[1].normalized_value >= this.normalized_value &&
         value[0].normalized_value <= this.normalized_value
      );
   }
   // this one is also reversed: value is the list of valid values
   valid_values(value) {
      for (const val of value) {
         if (val.normalized_value === this.normalized_value) {
            return true
         }
      }
      return false;
   }
   setNormalizedValue() {
      console.log(
         "ERROR: convert value has to be defined in child class of ToscaScalar"
      );
   }
}
