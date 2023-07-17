import { newToscaVersion } from "../model/version.js"

export default {
    exit_version(parsed_rule) {
        //console.log("\n+++++++++++++++++++++++++++++++++parsed_rule version:+++++++++++++++++++++++++++++++++");
        //console.log(parsed_rule);
        let version = (parsed_rule?.value) ? parsed_rule.value : ""
        newToscaVersion(version, parsed_rule)
    }
}