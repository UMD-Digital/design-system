import { white, red } from '../element/text/link';
import { create } from '../utilities';

export const linksDark = {
  '& a': {
    ...white,
  },
};

export const linksWhite = {
  '& a': {
    ...red,
  },
};

// umd-animation-grid
export const gridSetup = create.jssObject({
  '& > *': {
    [`@media (prefers-reduced-motion: no-preference)`]: {
      opacity: '0',
      transform: 'translateY(50px)',
    },
  },

  className: [
    `umd-animation-grid`,
    /** @deprecated Use 'umd-animation-grid' instead */
    'umd-grid-animation',
  ],
});
