export class ToscaNode {
    constructor(source) {
        this.source = source
        this.source.tosca = this
    }
}