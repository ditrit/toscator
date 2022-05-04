import { ToscaNode } from "./tosca_node";

export class ToscaValue extends ToscaNode {
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
}
