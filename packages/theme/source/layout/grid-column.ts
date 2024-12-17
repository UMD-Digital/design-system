import { Tokens } from '@universityofmaryland/variables';

const { Media } = Tokens;

const GridColumn = {
  '.umd-grid-column-double': {
    [`@media (${Media.queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },
};

const GridColumnAnimationSetup = {
  '.umd-grid-animation': {
    '& > *': {
      [`@media (prefers-reduced-motion: no-preference)`]: {
        opacity: '0',
        transform: 'translateY(50px)',
      },
    },
  },
};

export default {
  ...GridColumn,
  ...GridColumnAnimationSetup,
};
