import { validateCreateAndRegister } from '#src/models.js';

/**
 *
 */
export class ToscaNode {
  /**
   *
   * @param source
   */
  constructor(source) {
    this.source = source;
  }

  /**
   *
   */
  linkToAST() {
    this.source.tosca = this;
  }

  /**
   *
   * @param name
   */
  setName(name) {
    this.name = name;
  }

  /**
   * @returns {string}
   */
  getClassname() {
    // TODO: what is the purpose of this method ...?
    return this.constructor._classname;
  }

  /**
   * @param input
   * @param source
   * @returns {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  static isValid(input, source) {
    return true;
  }

  /**
   * Validates the node type.
   * @throws {Error} If a constraint is not applicable or entry_schema is misused.
   */
  validate() {
    this.constraints?.forEach((constraint) => {
      if (!constraint.isApplicable(this.type || this.derived_from)) {
        // TODO: Give the corresponding line of code in the error. Do this for all errors.
        throw new Error(
          `Invalid constraint application: '${constraint.operator}' constraint cannot be applied to type '${this.type || this.derived_from}'.`,
        );
      }
    });

    if (this.entry_schema && !['list', 'map'].includes(this.type)) {
      throw new Error(
        `Invalid use of entry_schema: entry_schema is only allowed for types 'list' or 'map', but found type '${this.type}'.`,
      );
    }
  }

  /**
   * Make this type inherit from a given type.
   * This method allows to implement the 'derived_from' clause.
   * @param {ToscaType} parent - Parent type to inherit from.
   */
  inheritFrom(parent) {
    // Note: ??= replaces the value if it is undefined/null.
    this.metadata ??= parent.metadata;
    this.version ??= parent.version;

    if (!parent.description?.startsWith('[inherited from')) {
      this.description ??= `[inherited from ${parent.name}] ${parent.description}`;
    }

    // Special case: 'artifacts' is a map or a string.
    // Here, we just inherit if it is undefined. No deep merge.
    this.artifacts ??= parent.artifacts;

    // We merge map attributes with a single depth level.
    // ie. attributes inside the maps are not deeply merged.
    // NB: Tosca Specification does not explicitely states whether this merge should be
    // recursively deep. Here we made the choice of simplicity with shallow map merging.
    ['attributes', 'capabilities', 'interfaces', 'properties'].forEach((definitionsSection) => {
      if (parent[definitionsSection]) {
        if (!this[definitionsSection]) {
          this[definitionsSection] = new Map();
        }

        parent[definitionsSection].forEach((value, key) => {
          this[definitionsSection].set(key, value);
        });
      }
    });

    if (parent.requirements) {
      this.requirements ??= [];

      for (const parentReq of parent.requirements) {
        const parentReqName = Object.keys(parentReq)[0];
        const parentReqDef = parentReq[parentReqName];
        const existingReq = this.requirements.find(
          (req) => Object.keys(req)[0] === parentReqName,
        );

        if (!existingReq) {
          this.requirements.push(parentReq);
        } else {
          const existingDef = existingReq[parentReqName];

          for (const property of ['capability', 'node', 'occurences', 'relationship']) {
            if (existingDef[property] === undefined) {
              existingDef[property] = parentReqDef[property];
            }
          }
        }
      }
    }
  }

  /**
   * Instanciate the node template from a parent type.
   * @param {ToscaNode} parentType - The parent type to instanciate from.
   * @throws {Error} If a required field is missing or a constraint is not fulfilled.
   */
  instanciateFrom(parentType) {
    this.description ??= parentType.description;

    const sections = ['attributes', 'capabilities', 'interfaces', 'properties'];

    sections.forEach((section) => {
      const assigns = this[section];

      assigns?.forEach((assign) => {
        // If the assignment is defined in the template.
        // if (assignValue) {

        parentType[section]?.forEach((currentDef) => {
          // If the assignment is defined in the parent type but not in the template.
          if (!assigns?.has(currentDef.name)) {
            // If the definition has a default value, create an assignment for it.
            if (currentDef.default) {
              // Use one of the existing template values as base.
              const DefaultTemplateClass = assigns.values().next().value.constructor;
              const existingValue = assigns.get(currentDef.name);
              const inheritedObject = {
                description: currentDef.description,
                constraints: currentDef.constraints,
                value: existingValue?.value ?? currentDef.default,
              };

              const defaultTemplate = validateCreateAndRegister(
                DefaultTemplateClass,
                inheritedObject,
                currentDef.source,
              );
              defaultTemplate.setName(currentDef.name);
              assigns.set(currentDef.name, defaultTemplate);
            }

            // Throw an error if the definition is required and not explicitly marked as optional.
            if (currentDef.required !== false && section === 'properties') {
              throw new Error(
                `Required field missing: '${currentDef.name}' is required in '${this.name}'.`,
              );
            }
          }
        });

        const parentDef = parentType[section]?.get(assign.name);

        assign.instanciateAssignFrom(
          parentDef,
        );
        assign.instanciateFrom(
          parentDef,
        );
      });
    });
  }

  /**
   * Instanciate the assignment from a parent type.
   * @param {ToscaNode} def - The parent definition to instanciate from.
   * @throws {Error} If the value is not of the expected type or if the entry_schema is misused.
   */
  instanciateAssignFrom(def) {
    this.description ??= def.description;

    const typeValidation = {
      string: (value) => typeof value === 'string',
      integer: (value) => typeof value === 'number' && Number.isInteger(value),
      float: (value) => typeof value === 'number',
      boolean: (value) => typeof value === 'boolean',
      timestamp: (value) => value.constructor.name === 'TimestampNode',
      null: (value) => value === null,
      version: (value) => value.constructor.name === 'ToscaVersion',
      range: (value) => {
        if (!Array.isArray(value)) {
          throw new Error(`Invalid type for range: value must be an array, got '${typeof value}'.`);
        }

        if (value.length !== 2) {
          throw new Error(`Invalid range: array must have exactly 2 elements, got ${value.length}.`);
        }

        if (value[0].type !== 'int') {
          throw new Error(
            `Invalid range: first element must be an integer, got '${value[0]?.value}'.`,
          );
        }

        if (value[1].type !== 'int' && value[1].value !== 'UNBOUNDED') {
          throw new Error(
            `Invalid range: second element must be an integer or 'UNBOUNDED', got '${value[1]?.value}'.`,
          );
        }

        return true;
      },
      list: (value) => {
        if (!Array.isArray(value)) return false;

        value.forEach((item) => {
          if (item.type !== value[0].type) {
            throw new Error(
              `Invalid type for list item: all items must have the same type in a TOSCA list. Found both '${value[0].type}' and '${item.type}'.`,
            );
          }
        });

        return true;
      },
      map: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
      'scalar-unit.size': (value) => value.constructor.name === 'ToscaSize',
      'scalar-unit.time': (value) => value.constructor.name === 'ToscaTime',
      'scalar-unit.frequency': (value) => value.constructor.name === 'ToscaFrequency',
      'scalar-unit.bitrate': (value) => value.constructor.name === 'ToscaBitrate',
    };
    const validator = typeValidation[def.type];

    if (validator && !validator(this.value)) {
      throw new Error(
        `Invalid type for property assign: '${this.value}' must be a ${def.type}.`,
      );
    }

    def.constraints?.forEach((constraint) => {
      const constraintLabels = {
        equal: 'equal to',
        greater_than: 'greater than',
        greater_or_equal: 'greater than or equal to',
        less_than: 'less than',
        less_or_equal: 'less than or equal to',
        in_range: 'between',
        valid_values: 'one of',
        length: 'of length',
        min_length: 'at least',
        max_length: 'at most',
        pattern: 'matching the pattern',
        schema: 'conforming to',
      };

      // If the parent type constraint is not fulfilled.
      if (!constraint.eval(this.value)) {
        throw new Error(
          `Unfulfilled constraint: '${this.name}' must be ${constraintLabels[constraint.operator]} '${constraint.value?.value ?? constraint.value}'.`,
        );
      }
    });

    if (def.entry_schema) {
      this.value.forEach((item) => {
        if (item.type !== def.entry_schema.type) {
          throw new Error(
            `Invalid type for list item: '${item.value}' is of type '${item.type}' but expected '${def.entry_schema.type}' as defined in entry_schema.`,
          );
        }
      });
    }
  }
}
