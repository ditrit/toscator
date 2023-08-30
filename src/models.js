/**
 *
 * @param ClassType
 * @param input
 * @param source
 */
export function validateCreateAndRegister(ClassType, input, source) {
  if (!ClassType.isValid) console.log(ClassType);
  if (ClassType.isValid(input, source)) {
    /**
     *  @type {ToscaNode}
     */
    const object = new ClassType(input, source);
    if (!object.linkToAST) console.log(ClassType);
    object.linkToAST();
    return object;
  }

  // TODO: error reporting
  return {};
}
