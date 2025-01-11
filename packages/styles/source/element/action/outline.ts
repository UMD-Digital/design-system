import { color } from '../../token';
import { create } from '../../utilities';
import { base, iconBase, baseLarge, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-outline';

const outlineBase = {
  backgroundColor: color.white,
  border: `1px solid ${color.gray.darker}`,
  color: color.black,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    backgroundColor: color.gray.darker,
    color: color.white,

    '& svg': {
      fill: color.white,
    },
  },
};

// umd-action-outline
export const normal = create.jssObject({
  ...base,
  ...outlineBase,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-action-outline' instead */
    `umd-forms-actions-outline`,
  ],

  '& svg': {
    ...iconBase,
    fill: color.red,
  },
});

// umd-action-outline-large
export const large = create.jssObject({
  ...baseLarge,
  ...outlineBase,

  className: `${classNamePrefix}-large`,

  '& svg': {
    ...iconBaseLarge,
    fill: color.red,
  },
});

// umd-action-outline-white
export const white = create.jssObject({
  ...base,
  color: color.white,
  border: `1px solid ${color.white}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  className: `${classNamePrefix}-white`,

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.white}`,
    backgroundColor: color.white,
    color: color.black,

    '& svg': {
      fill: color.black,
    },
  },

  '& svg': {
    ...iconBaseLarge,
    fill: color.white,
  },
});
