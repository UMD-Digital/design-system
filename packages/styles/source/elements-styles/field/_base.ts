import { Colors, Spacing } from '../../tokens';
import { sans } from '../../typography';

export const baseInput = {
  ...sans.small,
  backgroundColor: Colors.white,
  border: `1px solid ${Colors.gray.light}`,
  color: Colors.black,
  cursor: 'text',
  display: 'block',
  outlineOffset: '1px',
  padding: `${Spacing.xs} ${Spacing.sm}`,
  position: 'relative',
  textOverflow: 'ellipsis',
  transition: 'border 0.5s ease-in-out, color 0.5s ease-in-out',
  width: '100%',

  '&::placeholder': {
    color: Colors.gray.mediumAA,
  },

  '&[readonly]': {
    color: Colors.gray.mediumAA,
    fontStyle: 'italic',
    cursor: 'default',
  },

  [`&:focus, &:focus-within`]: {
    borderBottom: `1px solid ${Colors.black}`,
  },
};

export const baseInputChoice = {
  appearance: 'none',
  backgroundColor: Colors.white,
  border: `1px solid ${Colors.gray.light}`,
  cursor: 'pointer',
  flex: 'none',
  height: Spacing.md,
  padding: 0,
  position: 'relative',
  width: Spacing.md,

  '&:checked::after': {
    opacity: 1,
    visibility: 'visible',
  },
};

export const baseInputChoiceWrapper = {
  alignItems: 'center',
  cursor: 'pointer',
  color: Colors.black,
  display: 'inline-flex',
  gap: '16px',
  justifyContent: 'flex-start',
  transition: 'color 0.5s ease-in-out',

  [`&:hover, &:focus, &:focus-within`]: {
    color: Colors.redDark,
  },
};
