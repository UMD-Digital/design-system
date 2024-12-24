import { Colors, Spacing } from '../../tokens';
import { sans } from '../../typography';
import { create } from '../../utilities';

// Consistent naming
const classNamePrefix = 'umd-text-quote';

// umd-text-quote
export const quote = create.jssObject({
  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-text-quote' instead */
    `umd-rich-text-inline-quote`,
  ],

  '& blockquote': {
    ...sans.larger,
    ...{
      display: 'inline-block',
      borderLeft: `2px solid ${Colors.red}`,
      position: 'relative',
      paddingLeft: Spacing.md,
    },
  },
});
