import { parse } from '../../index.js'
import { ToscaProg } from '../../model/prog.js'

describe("Tosca compiler ->", function () {

    var version_ok = "data/minimal_file/version_ok.yml"
    var empty_file = "data/minimal_file/empty_file.yml"
    var bad_path_file = "data/minimal_file/bad_path_file.yml"
    var bad_path_url = "https://orness.com/minimal_file/bad_path_file.yml"
    var bad_version = "data/minimal_file/bad_version.yml"

    describe("Minimal source file: ", function () {

        it("Minimal file compilation provides ToscaProg object",
            function () { expect(parse(bad_version)).toBeInstanceOf(ToscaProg) });

        it("bad path file raises an error",
            function () { expect(parse(bad_path_file).errors.length).toBeGreaterThanOrEqual(1) });

        it("bad path url raises an error",
            function () { expect(parse(bad_path_url).errors.length).toBeGreaterThanOrEqual(1) });

        it("Empty file raises an error",
            function () { expect(parse(empty_file).errors.length).toBeGreaterThanOrEqual(1) });

        it("Minimal file compilation provides no errors",
            function () { expect(parse(version_ok).errors.length).toEqual(0) });

        it("Minimal file provides correct Tosca version",
            function () { expect(parse(version_ok).current_service_template?.tosca_definitions_version).toBe("tosca_simple_yaml_1_3") });

        it("Minimal file with bad version keyword",
            function () { expect(parse(bad_version).errors.length).toBeGreaterThanOrEqual(1) });

        // TODO : - Test URLs
        //        - Handle different versions of Tosca
    })

})
