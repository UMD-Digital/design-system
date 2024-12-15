import { Tokens } from '@universityofmaryland/variables';

const { Queries, Spacing } = Tokens;

const Default = {
  'umd-element-social-sharing:not(:defined)': {
    display: 'none',
  },
  'umd-element-social-sharing:defined': {
    display: 'block',
  },
  '* + umd-element-social-sharing': {
    marginTop: `${Spacing.md}`,
  },
};

const FixedStyles = {
  [`@media (${Queries.tablet.min})`]: {
    display: 'block',
    position: 'fixed',
    left: '0',
    top: '30vh',
    zIndex: '9999',
  },

  [`@media (${Queries.desktop.min})`]: {
    left: '40px',
  },
};

const Fixed = {
  'umd-element-social-sharing[fixed]': {
    ...FixedStyles,
  },
  'umd-element-social-sharing[data-layout-fixed="true"]': {
    ...FixedStyles,
  },
};

export default {
  ...Default,
  ...Fixed,
};
