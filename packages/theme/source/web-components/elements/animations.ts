import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Media } = Tokens;

const BrandLogo = {
  'umd-element-brand-logo-animation:not(:defined)': {
    display: 'none',
  },
  'umd-element-brand-logo-animation': {
    display: 'block',
    position: 'absolute',
    right: '0',
    top: '-3vw',
    height: '25vw',
    zIndex: '9',
    overflow: 'clip',

    [`@media (${Media.queries.highDef.min})`]: {
      top: '-11vw',
      height: '50vw',
    },
  },
};

export default {
  ...BrandLogo,
};
