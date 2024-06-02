import { Tokens } from '@universityofmaryland/variables';

const Block = {
  'umd-element-person:not(:defined)': {
    display: 'none',
  },
  'umd-element-person:defined': {
    display: 'block',
  },
};

const List = {
  'umd-element-person[display="list"] + umd-element-person[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

const Tabular = {
  'umd-element-person[display="tabular"] + umd-element-person[display="tabular"]':
    {
      marginTop: Tokens.Spacing.md,
    },
};

export default {
  ...Block,
  ...List,
  ...Tabular,
};
