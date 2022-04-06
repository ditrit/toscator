import {
    ToscaNode
} from './tosca_node.js'
import path from 'path'


export class ToscaImport extends ToscaNode {
    constructor(input, source) {
        super(source)
        this.file = input.file
        this.currentPath = (input.currentPath) ? input.currentPath : "."
        this.repository = input.repository
        this.namespace_prefix = input.namespace_prefix
        this.namespace_uri = input.namespace_uri
        this.setAbsolutePath()
    }


    toString() {
        return `\n    {Path: ${this.path}, \n    Repository: ${this.repository}, \n    Namespace_prefix: ${this.namespace_prefix}, \n    Namespace_uri: ${this.namespace_uri}}\n`
    }


    static isValid(input, source) {
        if (typeof(input.file) != 'string' || input.file == "") {
            source.ctx.grammarError('Incorrect file input for import')
            return false
        }
        if (typeof(input.repository) != 'string' ||
            typeof(input.namespace_prefix) != 'string' ||
            typeof(input.namespace_uri) != 'string') {

            source.ctx.grammarError('Incorrect file input for import')
            return false
        }
        return true
    }


    setAbsolutePath() {
        // ##### TODO: MANAGE REPOSITORIES #####
        this.path = ""
        if (this.repository && this.repository != "" && this.isRelative(this.file)) {
            this.path = `${this.source.ctx.prog.repositories[this.repository].getFullUrl()}/${this.file}`
        } else {

            this.path = (this.isRelative(this.file)) ?
                this.currentPath + '/' + this.file :
                this.file
        }
        if (!this.path.match(/^[a-zA-Z]*:\/\//)) {
            this.path = path.resolve(this.path)
        } else {
            this.path = path.resolve("/" + this.path).substring(1)
        }
        this.currentPath = path.dirname(this.path)
        this.source.ctx.prog.currentPath = this.currentPath
    }

    isRelative(path) {
        return (!path.match(/^[a-zA-Z]*:\/\//) || !path[0] == '/')
    }

    equals(other) {
        return (other instanceof ToscaImport && this.path == other.path && this.namespace_prefix == other.namespace_prefix && this.namespace_uri == other.namespace_uri)
    }
}



export function newToscaImport(input, source) {
    let res
    if (ToscaImport.isValid(input, source)) {
        res = new ToscaImport(input, source)
    } else {
        res = {}
    }
    return res
}