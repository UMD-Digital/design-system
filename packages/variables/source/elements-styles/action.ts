import { Colors, Spacing } from '../tokens';
import { elements } from '../typography';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-action';

const base = {
  ...elements.interativeSmall,
  padding: `${Spacing.xs} ${Spacing.lg}`,
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

  backgroundColor: Colors.red,
  border: `1px solid ${Colors.red}`,
  color: Colors.white,

  className: [
    `${classNamePrefix}-primary`,
    /** @deprecated Use 'umd-action-primary' instead */
    `umd-forms-actions-primary`,
  ],

  '& svg': {
    ...iconBase,
    fill: Colors.red,
  },

  [`&:hover,
    &:focus`]: {
    border: `1px solid ${Colors.redDark}`,
    backgroundColor: Colors.redDark,
  },
});

// umd-action-outline
export const outline = create.jssObject({
  ...base,
  backgroundColor: Colors.white,
  border: `1px solid ${Colors.gray.darker}`,
  color: Colors.black,

  className: [
    `${classNamePrefix}-outline`,
    /** @deprecated Use 'umd-action-outline' instead */
    `umd-forms-actions-outline`,
  ],

  '& svg': {
    ...iconBase,
    fill: Colors.black,
  },

  [`&:hover,
    &:focus`]: {
    backgroundColor: Colors.gray.darker,
    color: Colors.white,

    '& svg': {
      fill: Colors.white,
    },
  },
});
