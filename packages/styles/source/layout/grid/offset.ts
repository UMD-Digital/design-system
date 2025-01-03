import { media, spacing } from '../../tokens';
import { create } from '../../utilities';
import { threeLarge } from './gap';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-offset';

// umd-layout-grid-offset-three
export const threeColumn = create.jssObject({
  ...threeLarge,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-offset-three' instead */
    'umd-grid-gap-three-offset',
  ],

  '& > *': {
    alignSelf: 'start',
    display: 'grid',

    [`@media (${media.queries.desktop.min})`]: {
      minHeight: '400px',
    },
  },

  '& > *:first-child': {
    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing['2xl']}`,
    },
  },

  '& > *:nth-child(2)': {
    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing['8xl']}`,
    },
  },

  '& umd-element-stat': {
    [`@media (${media.queries.desktop.min})`]: {
      height: `100%`,
    },
  },
});
