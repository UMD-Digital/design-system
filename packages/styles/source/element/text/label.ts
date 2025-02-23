import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-label';

export const label = {
  ...sans.large,
  display: 'inline-block',
  position: 'relative',
  marginTop: spacing.sm,

  '&:has(+ input[required]):after': {
    content: "' *'",
    color: color.redDark,
  },

  '&[for]': {
    cursor: 'pointer',
  },
};

// umd-text-code
export const large = create.jssObject({
  className: `${classNamePrefix}-large`,
  ...label,
});
