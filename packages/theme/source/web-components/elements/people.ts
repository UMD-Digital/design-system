import { Tokens } from '@universityofmaryland/variables';

const Block = {
  'umd-element-person:not(:defined)': {
    display: 'none',
  },
  'umd-element-person:defined': {
    display: 'block',
  },
};

const Bio = {
  'umd-element-person-bio:not(:defined)': {
    display: 'none',
  },
  'umd-element-person-bio:defined': {
    display: 'block',
  },
};

const Hero = {
  'umd-element-person-hero:not(:defined)': {
    display: 'none',
  },
  'umd-element-person-hero:defined': {
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
  ...Bio,
  ...Hero,
  ...List,
  ...Tabular,
};
