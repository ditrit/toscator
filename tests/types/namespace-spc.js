import { parse } from '../../index.js'

describe("Tosca compiler ->", function () {

    var correct_namespace = "data/namespace/correct_namespace.yml"
    var incorrect_namespace = "data/namespace/incorrect_namespace.yml"
    var no_namespace = "data/namespace/no_namespace.yml"

    describe("Namespace: ", function () {

        it("Correct namespace",
            function () { expect(parse(correct_namespace).current_service_template.namespace).toBeInstanceOf(String) });

        it("incorrect namespace type",
            function () { expect(parse(incorrect_namespace).errors.length).toBeGreaterThanOrEqual(1) });

        it("no namespace",
            function () { expect(parse(no_namespace).errors.length).toEqual(0) });
    })
})
