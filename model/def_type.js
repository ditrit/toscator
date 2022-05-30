export class DefType {
   constructor(input, source) {
      // super(source);
      this.type = input.type;
      this.description = input.description;
      this.entrySchema = input.entrySchema;
      this.constraints = input.constraints;
   }

   static isValid(input) {
      //   let res = true;
      if (!input.type || !input.type instanceof String) {
         return false;
      }
      if (["map", "list"].includes(input.type)) {
         if (!input.entry_schema) {
            return false;
         }
      }

      // if (input.constraints && !input.constraints instanceof ToscaDescription) { // TODO
      //     res = false
      // }
      return true;
   }
   toString() {
      JSON.stringify(this);
   }
}

export function newDefType(input, source) {
   if (DefType.isValid(input)) {
      return new DefType(input, source);
   }
   // TO DO error
   source.ctx.grammarError(`Type not valid.`);

   return false;
}
