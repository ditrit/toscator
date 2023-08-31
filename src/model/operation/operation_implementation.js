import { ToscaNotificationImplementation } from '../notification/notification_implementation.js';

/**
 *
 */
export class ToscaOperationImplementation extends ToscaNotificationImplementation {
  /**
   *
   * @param input
   * @param source
   */
  constructor(input, source) {
    super(input, source);
    this.operation_host = input.operation_host;
    this.timeout = input.timeout;
  }
}
