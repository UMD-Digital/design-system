import { color } from '../../token';
import { create } from '../../utilities';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-primary';

const primaryBase = {
  backgroundColor: color.red,
  border: `1px solid ${color.red}`,
  color: color.white,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.redDark}`,
    backgroundColor: color.redDark,
  },
};

// umd-action-primary
export const normal = create.jssObject({
  ...base,
  ...primaryBase,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-action-primary' instead */
    `umd-forms-actions-primary`,
  ],

  '& svg': {
    ...iconBase,
    fill: color.white,
  },
});

// umd-action-primary-large
export const large = create.jssObject({
  ...baseLarge,
  ...primaryBase,

  className: `${classNamePrefix}-large`,

  '& svg': {
    ...iconBaseLarge,
    fill: color.white,
  },
});

// umd-action-primary-white
export const white = create.jssObject({
  ...base,
  backgroundColor: color.gray.lighter,
  color: color.black,
  border: `1px solid ${color.white}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.redDark}`,
    backgroundColor: color.redDark,
    color: color.white,

    '& svg': {
      fill: color.white,
    },
  },

  className: `${classNamePrefix}-white`,

  '& svg': {
    ...iconBase,
    fill: color.redDark,
  },
});
