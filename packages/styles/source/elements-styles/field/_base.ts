import { colors, spacing } from '../../tokens';
import { sans } from '../../typography';

export const baseInput = {
  ...sans.small,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray.light}`,
  color: colors.black,
  cursor: 'text',
  display: 'block',
  outlineOffset: '1px',
  padding: `${spacing.xs} ${spacing.sm}`,
  position: 'relative',
  textOverflow: 'ellipsis',
  transition: 'border 0.5s ease-in-out, color 0.5s ease-in-out',
  width: '100%',

  '&::placeholder': {
    color: colors.gray.mediumAA,
  },

  '&[readonly]': {
    color: colors.gray.mediumAA,
    fontStyle: 'italic',
    cursor: 'default',
  },

  [`&:focus, &:focus-within`]: {
    borderBottom: `1px solid ${colors.black}`,
  },
};

export const baseInputChoice = {
  appearance: 'none',
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray.light}`,
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

export const baseInputChoiceWrapper = {
  alignItems: 'center',
  cursor: 'pointer',
  color: colors.black,
  display: 'inline-flex',
  gap: '16px',
  justifyContent: 'flex-start',
  transition: 'color 0.5s ease-in-out',

  [`&:hover, &:focus, &:focus-within`]: {
    color: colors.redDark,
  },
};
