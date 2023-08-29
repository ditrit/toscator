/**
 *
 * @param ClassType
 * @param input
 * @param source
 */
export function validateCreateAndRegister(ClassType, input, source) {
  if (ClassType.isValid(input, source)) {
    /**
     *  @type {ToscaNode}
     */
    const object = new ClassType(input, source);
    object.linkToAST();
    return object;
  }

  // TODO: error reporting
  return {};
}
