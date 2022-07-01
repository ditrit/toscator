export default class RelationshipAssignment extends ToscaNode {
   constructor(input, source) {
      super(input, source);
      this.properties = input.properties;
      this.type = input.type;
      this.interfaces = input.interfaces;
   }
}
