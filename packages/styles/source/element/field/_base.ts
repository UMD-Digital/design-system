/**
 * @module element/field/_base
 * Provides base styles for form field elements.
 * @private
 */

import { color, spacing } from '../../token';
import { sans } from '../../typography';

/**
 * Base styles for text input elements.
 * @type {object}
 * @private
 */
export const baseInput = {
  ...sans.small,
  backgroundColor: color.white,
  border: `1px solid ${color.gray.light}`,
  color: color.black,
  cursor: 'text',
  display: 'block',
  outlineOffset: '1px',
  padding: `${spacing.xs} ${spacing.sm}`,
  position: 'relative',
  textOverflow: 'ellipsis',
  transition: 'border 0.5s ease-in-out, color 0.5s ease-in-out',
  width: '100%',

  '&::placeholder': {
    color: color.gray.mediumAA,
  },

  '&[readonly]': {
    color: color.gray.mediumAA,
    fontStyle: 'italic',
    cursor: 'default',
  },

  [`&:focus, &:focus-within`]: {
    borderBottom: `1px solid ${color.black}`,
  },
};

/**
 * Base styles for checkbox and radio input elements.
 * @type {object}
 * @private
 */
export const baseInputChoice = {
  appearance: 'none',
  backgroundColor: color.white,
  border: `1px solid ${color.gray.light}`,
  cursor: 'pointer',
  flex: 'none',
  height: spacing.md,
  padding: 0,
  position: 'relative',
  width: spacing.md,

  '&:checked::after': {
    opacity: 1,
    visibility: 'visible',
  },
};

/**
 * Base styles for checkbox and radio input wrapper elements.
 * @type {object}
 * @private
 */
export const baseInputChoiceWrapper = {
  alignItems: 'center',
  cursor: 'pointer',
  color: color.black,
  display: 'inline-flex',
  gap: '16px',
  justifyContent: 'flex-start',
  transition: 'color 0.5s ease-in-out',

  [`&:hover, &:focus, &:focus-within`]: {
    color: color.redDark,
  },
};
