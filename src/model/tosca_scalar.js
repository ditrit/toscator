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
   in_range(value) {
      return (
         this.normalized_value[1] >= value.normalized_value &&
         this.normalized_value[0] <= value.normalized_value
      );
   }
   valid_values(value) {
      return this.normalized_value.includes(value.normalized_value);
   }
   setNormalizedValue() {
      console.log(
         "ERROR: convert value has to be defined in child class of ToscaScalar"
      );
   }
}
