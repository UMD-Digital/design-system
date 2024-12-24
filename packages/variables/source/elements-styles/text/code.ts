import { Colors, Font, Spacing } from '../../tokens';
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
    border: `1px solid ${Colors.gray.lightest}`,
    backgroundColor: Colors.gray.lightest,
    borderRadius: '3px',
    color: 'currentColor',
    FontFamily: Font.family.mono,
  },

  '& code': {
    display: 'inline-block',
    padding: `0 ${Spacing.min}`,
  },

  '& pre': {
    padding: Spacing.min,
  },
});
