import { defMapofHelperSetname } from '#src/listener/listener_helpers/def_mapof_helper.js';

export default {
  exit_attribute_assignments(parsed_rule) {
    defMapofHelperSetname(parsed_rule);
  },
};
