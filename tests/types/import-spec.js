import { parse } from '../../index.js'
import { ToscaImport } from '../../model/imports.js'

describe("Tosca compiler ->", function () {

    var correct_simple_import = "data/import/correct_simpl_import.yml"
    var incorrect_simple_import = "data/import/incorrect_simple_import.yml"
    var no_import = "data/import/no_import.yml"
    var correct_full_import = "data/import/correct_full_import.yml"
    var incorect_full_import_no_file = "data/import/correct_full_import.yml"
    var incorrect_full_import_incorrect_repository = "data/import/correct_full_import.yml"
    var incorrect_full_import_incorrect_namespace_prefix = "data/import/correct_full_import.yml"
    var incorrect_full_import_incorrect_namespace_uri = "data/import/correct_full_import.yml"



    describe("Import tosca object: ", function () {

        it("Correct simple import",
            function () { expect(parse(correct_simple_import).current_service_template.import[0]).toBeInstanceOf(ToscaImport) });

        it("incorrect simple import type",
            function () { expect(parse(incorrect_simple_import).errors.length).not.toBeInstanceOf(ToscaImport) });

        it("no import",
            function () { expect(parse(no_import).errors.length).toBeGreaterThanOrEqual(1) });

        it("correct full import",
            function () { expect(parse(correct_full_import).errors.length).toEqual(0) });

        it("incorect full import - no file",
            function () { expect(parse(incorect_full_import_no_file).errors.length).toEqual(0) });

        it("incorrect full import - incorrect repository",
            function () { expect(parse(incorrect_full_import_incorrect_repository).errors.length).toEqual(0) });

        it("incorrect full import - incorrect namespace_prefix",
            function () { expect(parse(incorrect_full_import_incorrect_namespace_prefix).errors.length).toEqual(0) });

        it("incorrect full import - incorrect namespace_uri",
            function () { expect(parse(incorrect_full_import_incorrect_namespace_uri).errors.length).toEqual(0) });
    })


    var correct_import_simple_file = "data/import/correct_import_simple_file.yml"
    var incorrect_import_simple_file = "data/import/incorrect_import_simple_file.yml"
    var loop_import_file = "data/import/loop_import_file.yml"

    describe("Import files : ", function () {

        it("Correct import simple file",
            function () { expect(parse(correct_simple_import).service_templates.length).toBeGreaterThanOrEqual(1)});

        it("incorrect import simple file",
            function () { expect(parse(incorrect_simple_import).errors.length).not.toBeInstanceOf(ToscaImport) });

        it("loop import file",
            function () { expect(parse(no_import).errors.length).toBeGreaterThanOrEqual(1) });
    })
})
