import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import { padding } from './full';

// Consistent naming
const classNamePrefix = 'umd-layout-background-quarter';

const psuedo = {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  zIndex: -1,

  [`@media (${media.queries.tablet.max})`]: {
    display: 'none',
  },

  [`@media (${media.queries.desktop.min})`]: {
    width: `calc(75% + 80px)`,
  },
};

const quarter = {
  position: 'relative',
  ...padding,

  '&:before': {
    ...psuedo,
    backgroundColor: `${color.gray.lightest}`,
  },
};

// umd-layout-background-quarter-light
export const light = create.jssObject({
  ...quarter,

  className: [
    `${classNamePrefix}-light`,
    /** @deprecated Use 'umd-layout-background-quarter-light' instead */
    'umd-layout-background-quater-color',
  ],
});

// umd-layout-background-quarter-dark
export const dark = create.jssObject({
  ...quarter,

  '&:before': {
    ...psuedo,
    backgroundColor: `${color.gray.darker}`,
  },

  className: [
    `${classNamePrefix}-dark`,
    /** @deprecated Use 'umd-layout-background-quarter-dark' instead */
    'umd-layout-background-quater-color',
  ],
});
