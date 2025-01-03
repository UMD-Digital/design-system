import { colors, font, spacing } from '../../tokens';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-code';

// umd-text-code
export const code = create.jssObject({
  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-text-code' instead */
    `umd-rich-text-coding`,
  ],

  '& code, & pre': {
    border: `1px solid ${colors.gray.lightest}`,
    backgroundColor: colors.gray.lightest,
    borderRadius: '3px',
    color: 'currentColor',
    FontFamily: font.family.mono,
  },

  '& code': {
    display: 'inline-block',
    padding: `0 ${spacing.min}`,
  },

  '& pre': {
    padding: spacing.min,
  },
});
