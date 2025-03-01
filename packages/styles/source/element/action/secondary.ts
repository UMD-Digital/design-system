import { color, media, spacing } from '../../token';
import { create } from '../../utilities';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-secondary';

const secondaryBase = {
  color: color.black,
  padding: 0,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  '&:has(svg), &:has(img)': {
    paddingLeft: `calc(${spacing.md} - 4px)`,
  },
};

const secondaryLargeBase = {
  ...baseLarge,

  '&:has(svg), &:has(img)': {
    paddingLeft: `calc(${spacing.md} - 4px)`,
  },
};

const secondaryBaseIcon = {
  ...iconBase,
  left: `0`,

  '& path': {
    fill: `${color.red} !important`,
  },
};

const secondaryBaseLargeIcon = {
  ...iconBaseLarge,
  left: `0`,

  [`@media (${media.queries.tablet.min})`]: {
    left: `0`,
  },

  '& path': {
    fill: `${color.red} !important`,
  },
};

// umd-action-secondary
export const normal = create.jssObject({
  ...base,
  ...secondaryBase,
  className: `${classNamePrefix}`,
  color: `${color.black}`,

  '& svg': {
    ...secondaryBaseIcon,
  },
});

// umd-action-secondary-large
export const large = create.jssObject({
  ...baseLarge,
  ...secondaryLargeBase,
  className: `${classNamePrefix}-large`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: 0,
  },

  '& svg': {
    ...secondaryBaseLargeIcon,
  },
});

// umd-action-secondary-white
export const white = create.jssObject({
  ...base,
  ...secondaryBase,
  color: color.white,
  className: `${classNamePrefix}-white`,

  '& svg': {
    ...secondaryBaseIcon,
  },
});

// umd-action-secondary-gold
export const gold = create.jssObject({
  ...base,
  ...secondaryBase,
  color: color.white,
  className: `${classNamePrefix}-gold`,

  '& svg': {
    ...secondaryBaseIcon,
    fill: color.gold,
  },
});
