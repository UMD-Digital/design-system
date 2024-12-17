import { Tokens } from '@universityofmaryland/variables';

const { Media, Colors, Spacing } = Tokens;

const Default = {
  'umd-element-event:not(:defined)': {
    display: 'none',
  },
  'umd-element-event:defined': {
    display: 'block',
  },
  'umd-element-event[display="list"] + umd-element-event[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

const Featured = {
  'umd-element-event[display="feature"]': {
    [`@media (${Media.queries.large.max})`]: {
      borderBottom: `1px solid ${Colors.gray.light}`,
      paddingBottom: `${Spacing.md}`,
    },
  },
};

export default {
  ...Default,
  ...Featured,
};
