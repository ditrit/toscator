import {parse} from "../parser/parse.js";

//const res = parse('./tests/data_manual/test_parsing/testPropertyAssignments.yml');
//const res = parse("./tests/data_manual/test_parsing/testNodeFilter.yml");
//let res = parse('./tests/data_manual/testArtifact.yml')
//let res = parse('./tests/data_manual/testGroup.yml')
//let res = parse('./tests/data_manual/testInterface2.yml')
//let res = parse('./tests/data_manual/testOperation.yaml')
//let res = parse('./tests/data_manual/testProperty.yml')
//const res = parse('./tests/data_manual/testAttributeAssignments.yml')
//const res = parse('./tests/data_manual/testInputParameter.yml');
//const res = parse('./tests/data_manual/testRepository.yml');
//const res = parse('./tests/data_manual/test_data_type.yml');
//const res = parse('./tests/data_manual/testRelationshipTemplate.yml');
//const res = parse('./tests/data_manual/testInterfaceAssignment.yml');
//const res = parse('./tests/data_manual/testCapabilityType.yml');
//const res = parse('./tests/data_manual/testCapabilityDef.yml');
//const res = parse('./tests/data_manual/testRequirementDef.yml');
//const res = parse('./tests/data_manual/testRequirementAssignment.yml');
//const res = parse('./tests/data_manual/test_parsing/testRelationshipType.yml');
//const res = parse('./tests/data_manual/test_parsing/testTriggerDef.yml');
//const res = parse('./tests/data_manual/test_parsing/testCondition.yml');
//const res = parse('./tests/data_manual/test_parsing/testWorkflowActivity.yml');
//const res = parse('./tests/data_manual/test_parsing/testPolicyType.yml');
//const res = parse('./tests/data_manual/test_parsing/testPolicyDef.yml');
//const res = parse('./tests/data_manual/test_parsing/testPropertyMapping.yml');
//const res = parse('./tests/data_manual/test_parsing/testCapabilityMapping.yml');
//const res = parse('./tests/data_manual/test_parsing/testRequirementMapping.yml');
//const res = parse('./tests/data_manual/test_parsing/testInterfaceMapping.yml');
//const res = parse('./tests/data_manual/test_parsing/testSubstitutionMapping.yml');
//const res = parse('./tests/data_manual/testImports/serviceTemplateA.yml');

const res = parse('./tests/data_manual/testImports/A.yml');

//console.log(res.errors)
console.log(res.service_templates)
