import { Tokens } from '@universityofmaryland/variables';

const { Queries, Spacing } = Tokens;

const Default = {
  'umd-element-scroll-top:not(:defined)': {
    display: 'none',
  },
  'umd-element-scroll-top:defined': {
    display: 'block',
    height: '40px',
    width: '40px',
  },
  '* + umd-element-scroll-top': {
    marginTop: `${Spacing.md}`,
  },
};

const Fixed = {
  'umd-element-scroll-top[fixed]': {
    display: 'block',
    position: 'fixed',
    right: '8px',
    bottom: '10vh',
    zIndex: '9999',

    [`@media (${Queries.tablet.min})`]: {
      height: '52px',
      width: '52px',
      right: '40px',
    },
  },
};

export default {
  ...Default,
  ...Fixed,
};
