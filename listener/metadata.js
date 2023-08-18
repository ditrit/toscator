import { newToscaMetadata, newMetadataLeaf } from "../model/metadata.js";

export default {
    exit_metadata(parsed_rule) {
        let leafs = []
        
        for (const key in parsed_rule.value) {
            let metadata_leaf;
            let name = (key) ? key : ""
            let value = (parsed_rule.value[key]) ? parsed_rule.value[key].value : ""
            
            metadata_leaf = newMetadataLeaf({name, value}, parsed_rule);
            leafs.push(metadata_leaf);
        }

        newToscaMetadata(leafs, parsed_rule)
    }
}