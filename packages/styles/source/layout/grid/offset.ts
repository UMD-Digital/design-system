import { Media, Spacing } from '../../tokens';
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

    [`@media (${Media.queries.desktop.min})`]: {
      minHeight: '400px',
    },
  },

  '& > *:first-child': {
    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing['2xl']}`,
    },
  },

  '& > *:nth-child(2)': {
    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing['8xl']}`,
    },
  },

  '& umd-element-stat': {
    [`@media (${Media.queries.desktop.min})`]: {
      height: `100%`,
    },
  },
});
