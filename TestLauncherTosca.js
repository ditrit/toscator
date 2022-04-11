import { parse } from "./parser/parse.js";

let res = parse("./tests/data_manual/demo/demoSource.yml");

if (res.errors.length != 0) {
   console.log("TOSCA ERROR : ");
   res.errors.forEach((e) => console.log(e));
} else {
   console.log("\n\n\n\n#################### OBJECTS ####################");
   res.service_templates.forEach((st) => {
      for (const key in st.node_types) {
         if (
            key.startsWith("http") ||
            key.startsWith("/") ||
            key.includes(".")
         ) {
         } else {
            console.log("\n\n" + key + " = " + st.node_types[key].toString());
         }
      }
   });

   console.log("#################### NAME MANAGEMENT ####################");
   res.service_templates.forEach((st) => {
      console.log(
         "\n-------" + st.origin_file + " -------------------------------------"
      );
      for (const key in st.node_types) {
         console.log("key = " + key.toString());
      }
   });
}
