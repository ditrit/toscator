import { ToscaNotificationImplementation } from "./notification_implementation.js";

export class ToscaOperationImplementation extends ToscaNotificationImplementation {
    constructor(input, source) {
        super(input, source);
        this.operation_host = input.operation_host;
        this.timeout = input.timeout;
    }
}

export function newToscaOperationImplementation(input, source) {
    if (ToscaOperationImplementation.isValid(input, source))
        return new ToscaOperationImplementation(input, source);
    return {}
}