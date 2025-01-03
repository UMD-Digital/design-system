import { color, font, spacing } from '../../token';
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
    border: `1px solid ${color.gray.lightest}`,
    backgroundColor: color.gray.lightest,
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
