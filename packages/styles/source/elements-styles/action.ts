import { colors, spacing } from '../tokens';
import { elements } from '../typography';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-action';

const base = {
  ...elements.interativeSmall,
  padding: `${spacing.xs} ${spacing.lg}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',
  textAlign: 'center',
  maxWidth: '400px',
};

const iconBase = {
  height: '14px',
  width: '14px',
  transition: 'fill 0.5s ease-in-out',
  flex: 'none',
  zIndex: '99',
  marginRight: ' 4px',
  marginTop: '2px',
};

// umd-action-primary
export const primary = create.jssObject({
  ...base,

  backgroundColor: colors.red,
  border: `1px solid ${colors.red}`,
  color: colors.white,

  className: [
    `${classNamePrefix}-primary`,
    /** @deprecated Use 'umd-action-primary' instead */
    `umd-forms-actions-primary`,
  ],

  '& svg': {
    ...iconBase,
    fill: colors.red,
  },

  [`&:hover,
    &:focus`]: {
    border: `1px solid ${colors.redDark}`,
    backgroundColor: colors.redDark,
  },
});

// umd-action-outline
export const outline = create.jssObject({
  ...base,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray.darker}`,
  color: colors.black,

  className: [
    `${classNamePrefix}-outline`,
    /** @deprecated Use 'umd-action-outline' instead */
    `umd-forms-actions-outline`,
  ],

  '& svg': {
    ...iconBase,
    fill: colors.black,
  },

  [`&:hover,
    &:focus`]: {
    backgroundColor: colors.gray.darker,
    color: colors.white,

    '& svg': {
      fill: colors.white,
    },
  },
});
