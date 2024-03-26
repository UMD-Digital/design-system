import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;
const DisplayList = {
  'umd-element-person[display="list"] + umd-element-person[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

const DisplayTabular = {
  'umd-element-person[display="tabular"] + umd-element-person[display="tabular"]':
    {
      marginTop: Tokens.Spacing.md,
    },
};

export default {
  'umd-element-person:not(:defined)': {
    display: 'none',
  },
  'umd-element-person:defined': {
    display: 'block',
  },
  ...DisplayList,
  ...DisplayTabular,
};
