import { Colors, Spacing } from '../tokens';
import { sans } from '../typography';
import { create } from '../utilities';
import { valid, invalid } from './field/_state';

// Consistent naming
const classNamePrefix = 'umd-form';

const formBase = {
  '& label': {
    ...sans.large,

    display: 'inline-block',
    position: 'relative',

    '&.sr-only': {
      position: 'absolute',
    },

    '&:has(+ input[required]):after': {
      content: "' *'",
      color: Colors.redDark,
    },

    "&:not([class='sr-only']) + *": {
      marginTop: Spacing.sm,
    },

    '&[for]': {
      cursor: 'pointer',
    },
  },

  "& > [aria-invalid='true']": {
    ...invalid,
  },

  "& > [aria-invalid='false']": {
    ...valid,
  },
};

export const gray = create.jssObject({
  ...formBase,

  className: `${classNamePrefix}-gray`,
});
