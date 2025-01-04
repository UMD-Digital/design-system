import { color, media } from '../../token';
import { create } from '../../utilities';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-secondary';

const secondaryBase = {
  color: color.black,
  padding: 0,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',
};

// umd-action-secondary
export const normal = create.jssObject({
  ...base,
  ...secondaryBase,
  className: `${classNamePrefix}`,

  '& svg': {
    ...iconBase,
  },
});

// umd-action-secondary-large
export const large = create.jssObject({
  ...baseLarge,
  ...secondaryBase,
  className: `${classNamePrefix}-large`,

  [`@media (${media.queries.tablet.min})`]: {
    padding: 0,
  },

  '& svg': {
    ...iconBaseLarge,
  },
});

// umd-action-secondary-white
export const white = create.jssObject({
  ...base,
  ...secondaryBase,
  color: color.white,
  className: `${classNamePrefix}-white`,

  '& svg': {
    ...iconBase,
  },
});
