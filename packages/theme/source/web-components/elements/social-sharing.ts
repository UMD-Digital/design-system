import { Tokens } from '@universityofmaryland/variables';

const { Media, Spacing } = Tokens;

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
  [`@media (${Media.queries.tablet.min})`]: {
    display: 'block',
    position: 'fixed',
    left: '0',
    top: '30vh',
    zIndex: '9999',
  },

  [`@media (${Media.queries.desktop.min})`]: {
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
